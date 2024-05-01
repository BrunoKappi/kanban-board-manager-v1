import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";

export function DialogDemo() {
  const Objetcs = [{ Text: "Teste 1" }, { Text: "Teste 2" }, { Text: "Teste 3" }, { Text: "Teste 4" }];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DragDropContext
            onDragEnd={() => {
              alert("ffoi");
            }}
          >
            <Droppable droppableId={v4()} key={v4()}>
              {(provided: any) => {
                return (
                  <div className={`flex flex-col justify-start items-start gap-4 w-66  px-3 py-4 rounded-xl bg-slate-400/10 dark:bg-slate-400/5 mr-2 `} {...provided.droppableProps} ref={provided.innerRef}>
                    {Objetcs.map((Item, index) => {
                      return (
                        <Draggable key={Item.Text} draggableId={Item.Text} index={index}>
                          {(DragProvided: any, snapshot) => {
                            return (
                              <span className={snapshot.isDragging ? "ITEM" : ""} ref={DragProvided.innerRef} style={DragProvided.draggableProps.style} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                                {Item.Text}
                              </span> 
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
