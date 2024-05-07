import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { ListOption } from "../ListOption/ListOption";
import { CirclePlus, CircleUserRound, Clipboard, Link, Share2, Users, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Show from "@/lib/Show";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MIDDLEWARE_GetAllUsers } from "@/Middleware/GetData";
import { AddCollaborator, ChangeBoardSharingOptions, RemoveCollaborator } from "./BoardShareModal.Utils";
import { useSelector } from "react-redux";
import Tooltip from "../Tooltip/Tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

type Props = {};

const BoardShareModal = ({}: Props) => {
  const Board = useSelector((state: any) => state.Board);
  const User = useSelector((state: any) => state.User);
  const [ShareBoard, setShareBoard] = useState(Board.Public);
  const [CollaboratorEmail, setCollaboratorEmail] = useState("");
  const Translations = useSelector((state: any) => state.Translations);
  const [, setUsers] = useState([]);
  const [AllowEdit, setAllowEdit] = useState(Board.PuclicEdit);
  const [AllowDuplicate, setAllowDuplicate] = useState(Board.AllowDuplicate);
  const [PublicURL, setPublicURL] = useState(Board.PublicURL);
  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState("");
  const [CollabMessage, setCollabMessage] = useState("");

  const HandleDialogChange = (State: boolean) => {
    setOpen(State);
  };

  useEffect(() => {
    MIDDLEWARE_GetAllUsers().then((Data: any) => setUsers(Data));
    setShareBoard(Board.Public);
    setAllowEdit(Board.PuclicEdit);
    setAllowDuplicate(Board.AllowDuplicate);
    setPublicURL(Board.PublicURL);
  }, []);

  useEffect(() => {}, [ShareBoard]);

  const HandleShareBoard = (Result: boolean) => {
    setShareBoard(Result);
    if (Result) {
      setAllowEdit(true);
      setAllowDuplicate(true);
      setPublicURL(`https://kanban.bkappi.com/view/${Board.BoardId}`);
    } else {
      setAllowEdit(false);
      setAllowDuplicate(false);
      setPublicURL(``);
    }
    ChangeBoardSharingOptions(Result, Result, Result, []);
  };

  const HandleChangeEdit = (Result: boolean) => {
    setAllowEdit(Result);
    ChangeBoardSharingOptions(ShareBoard, Result, AllowDuplicate, []);
  };

  const HandleChangeDuplicate = (Result: boolean) => {
    setAllowDuplicate(Result);
    ChangeBoardSharingOptions(ShareBoard, AllowEdit, Result, []);
  };

  const UserUid = User?.uid;

  return (
    <Dialog open={open} onOpenChange={HandleDialogChange}>
      <DialogTrigger asChild>
        <ListOption>
          <Share2 className="size-4" />
          {Translations.Sharing.ListOption}
        </ListOption>
      </DialogTrigger>
      <DialogContent className="min-h-96 md:px-14 sm:max-w-[450px] md:max-w-[700px] max-h-[90dvh] overflow-y-scroll bg-background dark:bg-background-dark-dialog border dark:border-border-dark flex flex-col items-start">
        {/*COLAB*/}
        <h1 className=" text-3xl font-medium mb-4 mt-4 flex flex-row gap-2 items-center">
          <Users />
          {Translations.Sharing.Collaborators}
        </h1>
        <div className="flex flex-row  justify-between   py-0 rounded-sm w-full">
          <Input placeholder={Translations.Sharing.CollaboratorPlaceholder} className="flex-grow py-2 border-r px-3 truncate rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0" disabled={!UserUid} value={CollaboratorEmail} onChange={(e) => setCollaboratorEmail(e.target.value)} />
          <Button className=" flex-shrink-0 flex flex-row gap-2 items-center  cursor-pointer bg-primary px-3 rounded-r-sm text-primary-foreground rounded-l-none" disabled={!UserUid} onClick={() => AddCollaborator(CollaboratorEmail, setCollabMessage, setCollaboratorEmail)}>
            <CirclePlus className="size-5" />
            <span> {Translations.Sharing.AddCollaborator}</span>
          </Button>
        </div>
        {CollabMessage && <span className="w-full">{CollabMessage}</span>}

        <Show if={Board?.Collaborators?.length > 0}>
          <div className=" flex flex-row items-start justify-start gap-2 flex-wrap">
            {Board?.Collaborators?.map((Collab: any) => {
              return (
                <span className=" bg-blue-800/15 text-blue-900 dark:bg-blue-700/20 px-2 py-2 rounded-full flex flex-row items-center gap-2 text-sm truncate">
                  <Avatar className="size-4">
                    <AvatarImage src={Collab?.photoURL} alt="User" />
                    <AvatarFallback className="size-4 bg-transparent">
                      <CircleUserRound className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span>{Collab.Email}</span>
                  <Tooltip text={Translations.Sharing.RemoveCollaborator}>
                    <X className=" cursor-pointer hover:bg-overlay-dark rounded-full size-5 p-1" onClick={() => RemoveCollaborator(Collab)} />
                  </Tooltip>
                </span>
              );
            })}
          </div>
        </Show>
        {/*PUBLIC SHARING*/}

        <h1 className=" text-3xl font-medium mb-4 mt-6 flex flex-row gap-2 items-center ">
          <Link />
          {Translations.Sharing.AllowSharing}
        </h1>
        {!UserUid && <span className="mb-3 text-red-600 px-4 py-2 bg-red-200 rounded-lg">{Translations.Sharing.NotLogged}</span>}
        <div className="flex items-center space-x-2 BG">
          <Switch checked={ShareBoard} onCheckedChange={HandleShareBoard} disabled={!UserUid} />
          <Label> {Translations.Sharing.AllowSharing}</Label>
        </div>
        <Show if={true}>
          <span className="mt-5">{Translations.Sharing.PublicUrl}</span>
          <div className="flex flex-row  justify-between   py-0 rounded-sm w-full">
            <Input className="flex-grow py-2 border-r px-3 truncate rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0" value={PublicURL} disabled={!ShareBoard || !UserUid} />
            <Button
              className=" flex-shrink-0 flex flex-row gap-2 items-center  cursor-pointer bg-primary px-3 rounded-r-sm text-primary-foreground rounded-l-none"
              disabled={!ShareBoard || !UserUid}
              onClick={() => {
                navigator.clipboard.writeText(PublicURL);
                setMessage(Translations.Sharing.ClipboardMessage);
                setTimeout(() => {
                  setMessage("");
                }, 2000);
              }}
            >
              <Clipboard className="size-5" />
              <span>{Translations.Sharing.CopyButton}</span>
            </Button>
          </div>
          {Message && <span className="w-full text-center text-green-800">{Message}</span>}
          <div className="flex items-center space-x-2">
            <Switch checked={AllowEdit} onCheckedChange={HandleChangeEdit} disabled={!ShareBoard || !UserUid} />
            <Label>{Translations.Sharing.EditMessage}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={AllowDuplicate} onCheckedChange={HandleChangeDuplicate} disabled={!ShareBoard || !UserUid} />
            <Label>{Translations.Sharing.DuplicateMessage}</Label>
          </div>
        </Show>
      </DialogContent>
    </Dialog>
  );
};

export default BoardShareModal;
