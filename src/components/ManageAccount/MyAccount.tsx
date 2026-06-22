import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";
import { UserType } from "@/Config/Store/User/User";
import { File } from "buffer";
import { handleSetFileToUpload, SaveUserInfo, ExportUserData, DeleteUserAccount } from "./MyAccount.Utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleUserRound, Image, LoaderCircle, Mail, User2, UserRoundCog, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import Tooltip from "../Tooltip/Tooltip";
import { MAX_USER_NAME } from "@/Data/Limits";
import { v4 } from "uuid";
import moment from "moment";
import { DefaultBoardList } from "@/Data/BoardList";
import { ExampleBoard } from "@/Data/ExampleBoard";
import { STORE_SetBoardList, STORE_SetSelectedBoard, STORE_SetBoard, STORE_SetUserPreferencesdocID, STORE_SetUser } from "@/Middleware/Store";
import { LOCALSTORAGE_Clear, LOCALSTORAGE_GetItem, LOCALSTORAGE_SetItem } from "@/Middleware/LocalStorage";

export function MyAccount() {
  const User: UserType = useSelector((state: any) => state.User);
  const Translations = useSelector((state: any) => state.Translations);
  const [open, setOpen] = useState(false);
  const [Changed, setChanged] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [DisplayName, setDisplayName] = useState(User?.displayName);
  const [FileToUpload, setFileToUpload] = useState<File | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClearAndLogout = () => {
    const CurrentTheme = LOCALSTORAGE_GetItem("Kanban-Theme");
    const CurrentLanguage = LOCALSTORAGE_GetItem("Kanban-Language");

    LOCALSTORAGE_Clear();

    if (CurrentTheme) LOCALSTORAGE_SetItem("Kanban-Theme", CurrentTheme);
    if (CurrentLanguage) LOCALSTORAGE_SetItem("Kanban-Language", CurrentLanguage);
    
    const NewId = v4();
    const NewBoardListItem = { ...DefaultBoardList[0], LastEditedAt: moment().valueOf(), OwnerUid: "", BoardId: NewId };
    const NewBoard = { ...ExampleBoard, LastEditedAt: moment().valueOf(), OwnerUid: "", BoardId: NewId };

    LOCALSTORAGE_SetItem(`Kanban-Board-${NewBoard.BoardId}`, JSON.stringify(NewBoard));
    LOCALSTORAGE_SetItem(`Kanban-BoardListItem-${NewBoard.BoardId}`, JSON.stringify(NewBoardListItem));
    LOCALSTORAGE_SetItem(`Kanban-BoardList`, JSON.stringify([NewBoardListItem]));

    STORE_SetBoardList([NewBoardListItem]);
    STORE_SetSelectedBoard(NewBoardListItem.BoardId);

    setTimeout(() => STORE_SetBoard(NewBoard), 1500);
    setTimeout(() => STORE_SetBoard(NewBoard), 5);
    setTimeout(() => STORE_SetBoard(NewBoard), 2000);

    STORE_SetUserPreferencesdocID("");
    
    STORE_SetUser({
      displayName: "",
      docID: "",
      Email: "",
      uid: "",
      photoURL: "",
      loading: false,
      CreatedAt: 0,
      LastEditedAt: 0,
    });

    setOpen(false);
  };

  const HandleExportData = () => {
    ExportUserData(User, setLoading, setErrorMessage);
  };

  const HandleDeleteAccount = () => {
    DeleteUserAccount(User, handleClearAndLogout, setLoading, setErrorMessage);
  };

  const handleAttachFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setChanged(true);
    }
  };

  const HandleResetFile = () => {
    setFileToUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (DisplayName !== User.displayName) {
      setChanged(true);
    } else {
      if (!FileToUpload) {
        setChanged(false);
      }
    }
  }, [DisplayName, FileToUpload]);

  const HandleSaveUser = () => {
    if (!DisplayName) {
      setErrorMessage(Translations.MyAccount.ErrorName);
      setTimeout(() => setErrorMessage(""), 2500);
    } else {
      //@ts-ignore
      SaveUserInfo(FileToUpload, User, DisplayName, HandleResetAll, setLoading, setErrorMessage);
    }
  };

  const HandleResetAll = () => {
    HandleResetFile();
    setChanged(false);
  };

  const GetPhotoUrl = () => {
    if (FileToUpload) {
      //@ts-ignore
      return URL.createObjectURL(FileToUpload);
    } else {
      if (User.photoURL) {
        return User.photoURL;
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ListOption>
          <UserRoundCog className="size-4" />
          {Translations.MyAccount.ModalTitle}
        </ListOption>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[550px] bg-background dark:bg-card-foreground border dark:border-border-dark p-10 gap-5">
        <DialogHeader>
          <DialogTitle className=" text-xl mb-1">{Translations.MyAccount.ModalTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-row items-center justify-start gap-5">
          <Tooltip text={Translations.MyAccount.ChangeProfilePicture}>
            {(FileToUpload || User.photoURL) && <img className="w-20 rounded-full size-20 object-cover shadow-lg cursor-pointer" src={GetPhotoUrl()} alt="Profile Picture" onClick={handleAttachFileClick} />}
            {!FileToUpload && !User.photoURL && <CircleUserRound className="size-20" onClick={handleAttachFileClick} />}
          </Tooltip>

          <div className="flex flex-col gap-2 justify-start items-start flex-shrink">
            <div className="bg-overlay dark:bg-blue-800/20 px-4 py-0.5 rounded-full text-sm flex flex-row items-center justify-start w-auto gap-2 flex-shrink ">
              <User2 className="size-4 flex-shrink-0" />
              <span className=" max-w-full line-clamp-1">{DisplayName || Translations.MyAccount.NoName}</span>
            </div>
            <div className="bg-overlay dark:bg-blue-800/20 px-4 py-0.5 rounded-full text-sm flex flex-row items-center justify-start w-auto gap-2">
              <Mail className="size-4 flex-shrink-0" />
              <span className="">{User.Email}</span>
            </div>
          </div>
        </div>

        {!Loading && (
          <div>
            <Button variant="outline" size="sm" className="flex flex-row gap-2 text-xs" onClick={handleAttachFileClick}>
              <Image className="size-4" />
              <span>{Translations.MyAccount.ChangeProfilePicture}</span>
            </Button>
          </div>
        )}

        {FileToUpload && !Loading && (
          <div className="flex flex-row items-center justify-start text-sm gap-2 truncate">
            <span className="bg-blue-300 text-blue-600 px-2 rounded-xl truncate flex-shrink-0">{Translations.MyAccount.SelectedFile}</span>
            <span className=" underline truncate flex-shrink">{FileToUpload.name}</span>
            <span className="flex-grow flex flex-row justify-end">
              <Tooltip text={Translations.MyAccount.Clear}>
                <X className="size-5" onClick={HandleResetFile} />
              </Tooltip>
            </span>
          </div>
        )}

        {!Loading && (
          <div className="flex flex-col gap-1">
            <span className="text-xs">{Translations.MyAccount.Username}</span>
            <Input
              placeholder={Translations.MyAccount.UsernamePlaceholder}
              value={DisplayName}
              maxLength={MAX_USER_NAME}
              onChange={(event) => {
                setDisplayName(event.target.value);
              }}
            />
          </div>
        )}
        {!Loading && (
          <Input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(event) => {
              //@ts-ignore
              handleSetFileToUpload(event.target.files[0], setFileToUpload, setErrorMessage);
            }}
          />
        )}

        {!Loading && (
          <div className="flex flex-col gap-1">
            <span className="text-xs">Email</span>
            <Input placeholder="Email" value={User.Email} disabled />
          </div>
        )}

        {ErrorMessage && <span className=" text-sm text-destructive">{ErrorMessage}</span>}
        {Loading && <LoaderCircle className=" animate-spin" />}
        
        {/* LGPD Options */}
        {!Loading && !showDeleteConfirm && (
          <div className="border-t dark:border-border-dark pt-4 flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground">Privacidade & LGPD</span>
            <div className="flex flex-row gap-2">
              <Button variant="outline" size="sm" onClick={HandleExportData} className="flex-1 text-xs">
                {Translations.MyAccount.ExportData}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)} className="flex-1 text-xs">
                {Translations.MyAccount.DeleteAccount}
              </Button>
            </div>
          </div>
        )}

        {/* Delete Confirmation UI */}
        {showDeleteConfirm && !Loading && (
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-destructive">{Translations.MyAccount.DeleteAccountConfirmTitle}</h4>
              <p className="text-xs text-muted-foreground">{Translations.MyAccount.DeleteAccountConfirmDesc}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(false)} className="text-xs">
                {Translations.MyAccount.Cancel}
              </Button>
              <Button size="sm" variant="destructive" onClick={HandleDeleteAccount} className="text-xs">
                {Translations.MyAccount.DeleteAccountConfirmButton}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-row justify-end">
          <Button onClick={HandleSaveUser} disabled={!Changed || showDeleteConfirm}>
            {Translations.MyAccount.Save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
