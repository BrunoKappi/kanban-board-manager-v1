import FakeComponent from "@/components/FakeComponent/FakeComponent";
import BackButton from "@/lib/BackButton";
import Login from "@/screens/Login/Login";
import { Route, Routes as ReactRoutes } from "react-router-dom";

function OutRoutes() {
  return (
    <ReactRoutes>
      <Route index path="/" element={<Login />} />
      <Route
        path="*"
        element={
          <FakeComponent text="Página não Encontrada">
            <BackButton />
          </FakeComponent>
        }
      />
    </ReactRoutes>
  );
}

export default OutRoutes;
