import { useState } from "react";
import { LuRotateCw } from "react-icons/lu";
import { createPreviewHtml, previewPages } from "../../data/previewPages.js";
import { getBreakpointForWidth } from "../../data/viewports.js";
import PreviewFrame from "../previewFrame/index.jsx";
import styles from "./styles.module.css";

const PreviewWorkspace = ({ viewport, onViewportChange }) => {
    const [pageId, setPageId] = useState(previewPages[0].id);
    const page = previewPages.find((item) => item.id === pageId) ?? previewPages[0];
    const currentBreakpoint = getBreakpointForWidth(viewport.width);
    const nextOrientation = viewport.width >= viewport.height ? "portrait" : "landscape";

    const handleWidthChange = (event) => {
        onViewportChange({ ...viewport, width: Number(event.target.value) });
    };

    const handleHeightChange = (event) => {
        onViewportChange({ ...viewport, height: Number(event.target.value) });
    };

    const handleRotate = () => {
        onViewportChange({
            ...viewport,
            width: viewport.height,
            height: viewport.width,
        });
    };

    return (
        <section className={styles.previewWorkspace} id="preview" aria-labelledby="preview-title">
            <div className={styles.workspaceHeading}>
                <div>
                    <h2 id="preview-title">Live preview</h2>
                    <p>Resize the frame to check each layout change.</p>
                </div>
                <span className={styles.breakpointBadge}>
                    <span aria-hidden="true" />
                    {currentBreakpoint.label} range
                </span>
            </div>

            <div className={styles.toolbar}>
                <label className={styles.pageSelect} htmlFor="sample-page">
                    Sample page
                    <select
                        id="sample-page"
                        value={pageId}
                        onChange={(event) => setPageId(event.target.value)}
                    >
                        {previewPages.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </label>
                <div className={styles.orientationInfo}>
                    <span>{viewport.width} × {viewport.height} px</span>
                    <span>{viewport.width >= viewport.height ? "Landscape" : "Portrait"}</span>
                </div>
                <button
                    className={styles.rotateButton}
                    type="button"
                    onClick={handleRotate}
                    aria-label={`Rotate to ${nextOrientation} orientation`}
                >
                    <LuRotateCw aria-hidden="true" />
                    Rotate
                </button>
            </div>

            <div className={styles.rangeControls}>
                <label className={styles.rangeField} htmlFor="viewport-width">
                    <span>
                        Width <output htmlFor="viewport-width">{viewport.width} px</output>
                    </span>
                    <input
                        id="viewport-width"
                        type="range"
                        min="320"
                        max="2560"
                        step="1"
                        value={viewport.width}
                        onChange={handleWidthChange}
                        aria-label="Viewport width"
                    />
                </label>
                <label className={styles.rangeField} htmlFor="viewport-height">
                    <span>
                        Height <output htmlFor="viewport-height">{viewport.height} px</output>
                    </span>
                    <input
                        id="viewport-height"
                        type="range"
                        min="320"
                        max="1920"
                        step="1"
                        value={viewport.height}
                        onChange={handleHeightChange}
                        aria-label="Viewport height"
                    />
                </label>
            </div>

            <PreviewFrame
                html={createPreviewHtml(page.id, import.meta.env.BASE_URL)}
                pageName={page.name}
                width={viewport.width}
                height={viewport.height}
            />
            <p className={styles.frameNote}>
                Frame is scaled to fit. Its page keeps the selected pixel dimensions.
            </p>
        </section>
    );
};

export default PreviewWorkspace;
