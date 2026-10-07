import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader/index.jsx";
import ViewportControls from "./components/viewportControls/index.jsx";
import PreviewWorkspace from "./components/previewWorkspace/index.jsx";
import {
    customViewportStorageKey,
    defaultViewports,
    readCustomViewports,
} from "./data/viewports.js";

const App = () => {
    const [customViewports, setCustomViewports] = useState(readCustomViewports);
    const [activeViewport, setActiveViewport] = useState(defaultViewports[1]);

    useEffect(() => {
        try {
            localStorage.setItem(
                customViewportStorageKey,
                JSON.stringify(customViewports),
            );
        } catch {
            // The built-in sizes remain available when storage is disabled.
        }
    }, [customViewports]);

    const handleAddCustom = (viewport) => {
        setCustomViewports((currentViewports) => [viewport, ...currentViewports]);
        setActiveViewport(viewport);
    };

    const handleViewportChange = (viewport) => {
        setActiveViewport({
            ...viewport,
            id: "current-size",
            name: "Current size",
            kind: "custom",
        });
    };

    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.pageContent} id="top">
                <section className={styles.introduction}>
                    <h1>Test the width. See what changes.</h1>
                    <p>
                        Preview a sample page at the screen sizes that matter to your
                        layout.
                    </p>
                </section>
                <div className={styles.workspace}>
                    <aside className={styles.controlPanel} id="sizes">
                        <ViewportControls
                            activeId={activeViewport.id}
                            customViewports={customViewports}
                            onAddCustom={handleAddCustom}
                            onSelect={setActiveViewport}
                        />
                        <p className={styles.storageNote}>
                            Custom sizes stay in this browser.
                        </p>
                    </aside>
                    <PreviewWorkspace
                        viewport={activeViewport}
                        onViewportChange={handleViewportChange}
                    />
                </div>
                <section className={styles.guide} id="guide">
                    <h2>Start with a common screen</h2>
                    <p>
                        Switch sizes to see how a page adapts, then use a custom
                        width to check your own breakpoint.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default App;
