import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton2 = () => {
  let navigate = useNavigate();
  return (
    <Button size="icon" variant="link" onClick={() => navigate("..")}>
      <ChevronLeft />
    </Button>
  );
};

export default BackButton2;
