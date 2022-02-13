import { BrowserRouter } from "react-router-dom";
import { RealmAppProvider } from "./RealmApp";
import { Routes } from "./Routes";
import "./App.css";

function App() {
  return (
    <RealmAppProvider appId={process.env.REACT_APP_REALM_APP_ID}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RealmAppProvider>
  );
}

export default App;
