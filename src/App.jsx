// App.jsx
import React from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import './App.css';

function App() {
    return (
        <div className="app-container">
            <h1 className="app-header">Excalidraw</h1>
            <div className="excalidraw-container">
                <Excalidraw/>
            </div>
        </div>
    );
}

export default App;