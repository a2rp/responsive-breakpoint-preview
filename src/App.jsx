import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader/index.jsx";
import ViewportControls from "./components/viewportControls/index.jsx";
import PreviewWorkspace from "./components/previewWorkspace/index.jsx";
import BreakpointGuide from "./components/breakpointGuide/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
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
        setCustomViewports((currentViewports) => [
            viewport,
            ...currentViewports,
        ]);
        setActiveViewport(viewport);
    };

    const handleRemoveCustom = (viewportId) => {
        setCustomViewports((currentViewports) =>
            currentViewports.filter((viewport) => viewport.id !== viewportId),
        );

        if (activeViewport.id === viewportId) {
            setActiveViewport(defaultViewports[1]);
        }
    };

    const handleViewportChange = (viewport) => {
        setActiveViewport({
            ...viewport,
            id: "current-size",
            name: "Current size",
            kind: "custom",
        });
    };

    const handleTestWidth = (width) => {
        handleViewportChange({ ...activeViewport, width });
        document
            .getElementById("preview")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.pageContent} id="top">
                <section className={styles.introduction}>
                    <h1>Test the width. See what changes.</h1>
                    <p>
                        Preview a sample page at the screen sizes that matter to
                        your layout.
                    </p>
                </section>
                <div className={styles.workspace}>
                    <aside className={styles.controlPanel} id="sizes">
                        <ViewportControls
                            activeId={activeViewport.id}
                            customViewports={customViewports}
                            onAddCustom={handleAddCustom}
                            onRemoveCustom={handleRemoveCustom}
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
                <BreakpointGuide
                    currentWidth={activeViewport.width}
                    onTestWidth={handleTestWidth}
                />
            </main>
            <SiteFooter />
            <BackToTop />
        </div>
    );
};

export default App;
