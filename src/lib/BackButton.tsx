import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  let navigate = useNavigate();
  return (
    <Button size="icon" variant="link" onClick={() => navigate("..")}>
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
