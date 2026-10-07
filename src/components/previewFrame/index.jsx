import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const browserBarHeight = 38;

const PreviewFrame = ({ html, pageName, width, height }) => {
    const stageRef = useRef(null);
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const fullHeight = height + browserBarHeight;
    const availableWidth = Math.max(0, stageSize.width - 32);
    const availableHeight = Math.max(0, stageSize.height - 32);
    const scale =
        stageSize.width > 0 && stageSize.height > 0
            ? Math.min(1, availableWidth / width, availableHeight / fullHeight)
            : 1;

    useEffect(() => {
        const stage = stageRef.current;

        if (!stage) {
            return undefined;
        }

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            setStageSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });

        observer.observe(stage);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.previewStage} ref={stageRef}>
            <div
                className={styles.frameSizer}
                style={{ width: width * scale, height: fullHeight * scale }}
            >
                <div
                    className={styles.browserWindow}
                    style={{
                        width,
                        height: fullHeight,
                        transform: `scale(${scale})`,
                    }}
                >
                    <div className={styles.browserBar} aria-hidden="true">
                        <div className={styles.windowDots}>
                            <span />
                            <span />
                            <span />
                        </div>
                        <span className={styles.address}>sample.local</span>
                        <span className={styles.frameDimensions}>
                            {width} × {height}
                        </span>
                    </div>
                    <iframe
                        className={styles.previewDocument}
                        title={`${pageName} at ${width} pixels wide`}
                        srcDoc={html}
                        sandbox="allow-same-origin"
                        referrerPolicy="no-referrer"
                        width={width}
                        height={height}
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewFrame;
