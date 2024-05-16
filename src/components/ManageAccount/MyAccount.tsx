import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";
import { UserType } from "@/Config/Store/User/User";
import { File } from "buffer";
import { handleSetFileToUpload, SaveUserInfo } from "./MyAccount.Utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleUserRound, Image, LoaderCircle, Mail, User2, UserRoundCog, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import Tooltip from "../Tooltip/Tooltip";
import { MAX_USER_NAME } from "@/Data/Limits";

export function MyAccount() {
  const User: UserType = useSelector((state: any) => state.User);
  const Translations = useSelector((state: any) => state.Translations);
  const [open, setOpen] = useState(false);
  const [Changed, setChanged] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [DisplayName, setDisplayName] = useState(User?.displayName);
  const [FileToUpload, setFileToUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        <div className="flex flex-row justify-end">
          <Button onClick={HandleSaveUser} disabled={!Changed}>
            {Translations.MyAccount.Save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
