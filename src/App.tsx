import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FIREBASE_GetDocBoards } from "./Config/Firebase/Firestore";
import { useDispatch } from "react-redux";
import { GetInitialState, SetBoards } from "./Config/Store/Boards/Boards";
import { GetPanelSize } from "./lib/utils";
import { GetBoardList } from "./Middleware/GetData";

function App() {
  const User = useSelector((state: any) => state.User);
  const SidebarState = useSelector((state: any) => state.Sidebar);
  const [Screen, setScreen] = useState(window.innerWidth);

  const dispatch = useDispatch();

  //DATA /////////////

  GetBoardList();

  //DATA //////////////////

  if (User.uid) {
    FIREBASE_GetDocBoards(User.uid).then((Data) => {
      if (Data.length > 0)
        //@ts-ignore
        dispatch(SetBoards(Data));
      else dispatch(SetBoards(GetInitialState()));
    });
  } else if (User.displayName === "Guest") {
    //@ts-ignore
    //dispatch(SetBoards(GetInitialState()));
  }

  useEffect(() => {
    const handleResize = () => setScreen(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resizablePanelsRef = useRef(null);

  //@ts-ignore -- Para ignorar o erro que ocorre na linha seguinte, pois a lib não possui tipagem das funç~eos collapse e expand
  if (SidebarState === "Closed") resizablePanelsRef?.current?.collapse();
  //@ts-ignore
  if (SidebarState === "Opened") resizablePanelsRef?.current?.expand();

  const GetElement = () => {
    if (Screen >= 768) {
      return (
        <ResizablePanelGroup direction="horizontal" className=" h-dvh  w-full rounded-lg ">
          <ResizablePanel ref={resizablePanelsRef} collapsible defaultSize={GetPanelSize("Left", SidebarState)} className=" transition-all">
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={GetPanelSize("Right", SidebarState)}>
            <Content />
          </ResizablePanel>
        </ResizablePanelGroup>
      );
    } else {
      return (
        <ResizablePanelGroup direction="horizontal" className=" h-dvh  w-full rounded-lg ">
          <ResizablePanel defaultSize={100}>
            <Content />
          </ResizablePanel>
        </ResizablePanelGroup>
      );
    }
  };

  return (
    <main className=" h-dvh w-dvw bg-background dark:bg-background-dark">
      <Routes>
        <Route path="/" element={GetElement()} />

        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </main>
  );
}

export default App;
