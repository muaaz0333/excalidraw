// src/components/ExcalidrawCanvas.jsx
import React, { useState, useEffect, useRef } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import "./ExcalidrawCanvas.css"; // Import custom styles

const ExcalidrawCanvas = () => {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    const [elements, setElements] = useState([]);
    const containerRef = useRef(null);

    // Initial data for Excalidraw
    const initialData = {
        elements: [
            {
                type: "rectangle",
                id: "initial-rect",
                x: 100,
                y: 100,
                width: 200,
                height: 150,
                strokeColor: "#1e90ff",
                backgroundColor: "#87ceeb",
                fillStyle: "solid",
            },
        ],
        appState: {
            viewBackgroundColor: "#f0f0f0",
            currentItemFontFamily: 1, // Default font
            zenModeEnabled: false,
            gridSize: 20, // Enable grid
        },
    };

    // Handle saving the canvas data
    const handleSave = () => {
        if (excalidrawAPI) {
            const currentElements = excalidrawAPI.getSceneElements();
            setElements(currentElements);
            console.log("Saved Elements:", currentElements);
            // You can save this to localStorage, a server, etc.
        }
    };

    // Handle changes in the canvas
    const onChange = (elements, appState) => {
        console.log("Canvas updated:", { elements, appState });
    };

    return (
        <div className="excalidraw-wrapper" ref={containerRef}>
            <div className="excalidraw-container">
                <Excalidraw
                    ref={(api) => setExcalidrawAPI(api)}
                    initialData={initialData}
                    onChange={onChange}
                    theme="light" // Options: "light" or "dark"
                    name="My Excalidraw Canvas"
                    langCode="en-US" // Language code
                    viewModeEnabled={false} // Disable view-only mode
                    zenModeEnabled={false} // Disable zen mode
                    gridModeEnabled={true} // Enable grid
                    UIOptions={{
                        canvasActions: {
                            changeViewBackgroundColor: true,
                            clearCanvas: true,
                            export: true,
                            loadScene: true,
                            saveAsImage: true,
                        },
                    }}
                >
                    {/* Customize the Main Menu */}
                    <MainMenu>
                        <MainMenu.DefaultItems.ClearCanvas />
                        <MainMenu.DefaultItems.SaveAsImage />
                        <MainMenu.DefaultItems.Export />
                        <MainMenu.Separator />
                        <MainMenu.Item
                            onSelect={() => alert("Custom action triggered!")}
                        >
                            Custom Action
                        </MainMenu.Item>
                    </MainMenu>

                    {/* Customize the Welcome Screen */}
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                        <WelcomeScreen.Center>
                            <WelcomeScreen.Center.Logo />
                            <WelcomeScreen.Center.Heading>
                                Welcome to My Excalidraw!
                            </WelcomeScreen.Center.Heading>
                            {/*<WelcomeScreen.Center.Description>*/}
                            {/*    Start drawing or load a file to begin.*/}
                            {/*</WelcomeScreen.Center.Description>*/}
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>
            </div>

            {/* Save Button */}
            <div className="controls">
                <button onClick={handleSave} className="save-button">
                    Save Drawing
                </button>
            </div>

            {/* Display Saved Data */}
            {elements.length > 0 && (
                <div className="saved-data">
                    <h3>Saved Elements:</h3>
                    <pre>{JSON.stringify(elements, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ExcalidrawCanvas;