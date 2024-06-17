import React, { useState } from "react";
import "./index.css";
import MyEditor from "./components/MyEditor";
import History from "./components/History";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, persistor } from "./utils/AppStore";

function App() {
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <Provider store={AppStore}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <header>
            <div className="hamburger" onClick={toggleHistory}>
              &#9776;
            </div>
            <h2>Demo Editor by Swati Moluguri</h2>
          </header>
          <main>
            <History show={showHistory} onClose={toggleHistory} />
            <MyEditor />
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
