import { useEffect, useState } from "react";
import { MIDDLEWARE_GetBoardList } from "./Middleware/BoardList";
import { STORE_GET, STORE_SetSelectedBoard } from "./Middleware/Store";

function Updates() {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setInactive(true), 1800000); //  30 minute
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
    const CurrentSelectedBoard = STORE_GET("SelectedBoard");
    if (!!CurrentSelectedBoard) {
      STORE_SetSelectedBoard("NA");
      setTimeout(() => {
        STORE_SetSelectedBoard(CurrentSelectedBoard);
      }, 100);
    }
  };

  useEffect(() => {
    if (!inactive) {
      const CurrentSelectedBoard = STORE_GET("SelectedBoard");
      UpdateBoard();
      MIDDLEWARE_GetBoardList().then(() => {
        setTimeout(() => {
          STORE_SetSelectedBoard(CurrentSelectedBoard);
        }, 100);
      });
    }
  }, [inactive]);

  return <div className="hidden">{inactive ? "Mouse inativo por mais de um minuto" : "Mouse ativo"}</div>;
}

export default Updates;
