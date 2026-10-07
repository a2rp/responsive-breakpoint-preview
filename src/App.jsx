import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader/index.jsx";
import ViewportControls from "./components/viewportControls/index.jsx";
import PreviewFrame from "./components/previewFrame/index.jsx";
import {
    customViewportStorageKey,
    defaultViewports,
    readCustomViewports,
} from "./data/viewports.js";
import { createPreviewHtml, previewPages } from "./data/previewPages.js";

const App = () => {
    const [customViewports, setCustomViewports] = useState(readCustomViewports);
    const [activeViewport, setActiveViewport] = useState(defaultViewports[1]);
    const activePage = previewPages[0];

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
                <div className={styles.workspace} id="preview">
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
                    <section
                        className={styles.previewPanel}
                        aria-labelledby="preview-title"
                    >
                        <div className={styles.previewHeading}>
                            <div>
                                <h2 id="preview-title">Your test screen</h2>
                                <p>Current viewport</p>
                            </div>
                            <span className={styles.currentDimensions}>
                                {activeViewport.width} × {activeViewport.height}
                            </span>
                        </div>
                        <PreviewFrame
                            html={createPreviewHtml(activePage.id, import.meta.env.BASE_URL)}
                            pageName={activePage.name}
                            width={activeViewport.width}
                            height={activeViewport.height}
                        />
                    </section>
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
