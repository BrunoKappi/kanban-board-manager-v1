import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetSelectedBoard } from "./Config/Store/SelectedBoard/SelectedBoard";
import store from "./Config/Store/Store";
import { GetBoardList } from "./Middleware/GetData";

function Updates() {
  const dispatch = useDispatch();

  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setInactive(true), 360000); //  6 minute
    };

    const handleMouseMove = () => {
      if (inactive) {
        setInactive(false);
      }
      resetTimer();
    };

    const handleMouseActivity = () => {
      if (inactive) {
        setInactive(false);
      }
      resetTimer();
    };

    resetTimer();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseActivity);
    window.addEventListener("keypress", handleMouseActivity);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseActivity);
      window.removeEventListener("keypress", handleMouseActivity);
      clearTimeout(timeoutId); // Limpa o timeout quando o componente é desmontado
    };
  }, [inactive]);

  const UpdateBoard = async () => {
    const CurrentSelectedBoard = store.getState().SelectedBoard;
    if (!!CurrentSelectedBoard) {
      //@ts-ignore
      dispatch(SetSelectedBoard("NA"));
      setTimeout(() => {
        //@ts-ignore
        dispatch(SetSelectedBoard(CurrentSelectedBoard));
      }, 100);
    }
  };

  useEffect(() => {
    if (!inactive) {
      UpdateBoard();
      GetBoardList();
    }
  }, [inactive]);

  return <div className="hidden">{inactive ? "Mouse inativo por mais de um minuto" : "Mouse ativo"}</div>;
}

export default Updates;
