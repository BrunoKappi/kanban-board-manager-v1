import { Route, Routes } from "react-router-dom";
import BackButton from "@/lib/BackButton";

import FakeComponent from "@/components/FakeComponent/FakeComponent";

function InRoutes() {
  return (
    <main className="flex flex-col h-dvh">
      <Routes>
        <Route index path="/" element={<FakeComponent text="Página Inicial" />} />

        <Route
          path="*"
          element={
            <FakeComponent text="Página não Encontrada">
              <BackButton />
            </FakeComponent>
          }
        />
      </Routes>
    </main>
  );
}

export default InRoutes;
