import "./App.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Content from "./components/Content/Content";

function App() {
  return (
    <div className=" h-dvh">
      <PanelGroup autoSaveId="example" direction="horizontal" className="bg-gray-300 h-dvh">
        <Panel defaultSize={25}>
          <div className="bg-red-500 h-full">SIDEBAR</div>
        </Panel>
        <PanelResizeHandle />
        <Panel>
          <Content />
        </Panel>
        <PanelResizeHandle />
      </PanelGroup>
    </div>
  );
}

export default App;
