import { LuArrowDownToLine, LuMoveRight } from "react-icons/lu";
import { breakpointGuides } from "../../data/viewports.js";
import styles from "./styles.module.css";

const BreakpointGuide = ({ currentWidth, onTestWidth }) => (
    <section className={styles.breakpointGuide} id="guide" aria-labelledby="guide-title">
        <div className={styles.heading}>
            <div>
                <h2 id="guide-title">Check a breakpoint</h2>
                <p>Compare the width just before a common screen transition.</p>
            </div>
            <span className={styles.currentWidth}>
                <LuMoveRight aria-hidden="true" />
                {currentWidth} px now
            </span>
        </div>
        <div className={styles.guideGrid}>
            {breakpointGuides.map((breakpoint, index) => {
                const beforeWidth = breakpoint.width - 1;
                const currentAtBoundary = currentWidth === breakpoint.width;

                return (
                    <article className={styles.guideCard} key={breakpoint.id}>
                        <div className={styles.cardTop}>
                            <span className={styles.step}>0{index + 1}</span>
                            <span className={styles.range}>{breakpoint.range}</span>
                        </div>
                        <h3>{breakpoint.label}</h3>
                        <div className={styles.testButtons}>
                            <button
                                className={styles.beforeButton}
                                type="button"
                                aria-label={`Test at ${beforeWidth} pixels, just before ${breakpoint.width}`}
                                aria-pressed={currentWidth === beforeWidth}
                                onClick={() => onTestWidth(beforeWidth)}
                            >
                                <LuArrowDownToLine aria-hidden="true" />
                                {beforeWidth} px
                            </button>
                            <button
                                className={currentAtBoundary ? styles.activeButton : styles.boundaryButton}
                                type="button"
                                aria-label={`Test at the ${breakpoint.width} pixel breakpoint`}
                                aria-pressed={currentAtBoundary}
                                onClick={() => onTestWidth(breakpoint.width)}
                            >
                                {breakpoint.width} px
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    </section>
);

export default BreakpointGuide;
