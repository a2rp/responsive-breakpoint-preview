import { useState } from "react";
import {
    LuLaptop,
    LuMonitor,
    LuPlus,
    LuSmartphone,
    LuTablet,
    LuTrash2,
    LuX,
} from "react-icons/lu";
import ConfirmationDialog from "../confirmationDialog/index.jsx";
import { customViewportLimit, defaultViewports } from "../../data/viewports.js";
import styles from "./styles.module.css";

const icons = {
    phone: LuSmartphone,
    tablet: LuTablet,
    laptop: LuLaptop,
    desktop: LuMonitor,
    custom: LuMonitor,
};

const ViewportControls = ({
    activeId,
    customViewports,
    onAddCustom,
    onRemoveCustom,
    onSelect,
}) => {
    const [formOpen, setFormOpen] = useState(false);
    const [name, setName] = useState("");
    const [width, setWidth] = useState("414");
    const [height, setHeight] = useState("896");
    const [error, setError] = useState("");
    const [removeTarget, setRemoveTarget] = useState(null);
    const allViewports = [...defaultViewports, ...customViewports];
    const limitReached = customViewports.length >= customViewportLimit;

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedName = name.trim();
        const nextWidth = Number(width);
        const nextHeight = Number(height);

        if (!trimmedName || trimmedName.length > 24) {
            setError("Enter a name up to 24 characters.");
            return;
        }

        if (
            !Number.isInteger(nextWidth) ||
            nextWidth < 320 ||
            nextWidth > 2560 ||
            !Number.isInteger(nextHeight) ||
            nextHeight < 360 ||
            nextHeight > 1920
        ) {
            setError(
                "Use a width from 320 to 2560 and a height from 360 to 1920.",
            );
            return;
        }

        if (limitReached) {
            setError(
                `You have reached the limit of ${customViewportLimit} custom sizes.`,
            );
            return;
        }

        const viewport = {
            id: `custom-${Date.now()}`,
            name: trimmedName,
            width: nextWidth,
            height: nextHeight,
            kind: "custom",
        };

        onAddCustom(viewport);
        setName("");
        setFormOpen(false);
        setError("");
    };

    const openForm = () => {
        setFormOpen(true);
        setError("");
    };

    const closeForm = () => {
        setFormOpen(false);
        setError("");
    };

    return (
        <section
            className={styles.viewportControls}
            aria-labelledby="sizes-title"
        >
            <div className={styles.heading}>
                <div>
                    <h2 id="sizes-title">Viewport sizes</h2>
                    <p>Choose a screen to test</p>
                </div>
                <span className={styles.count}>{allViewports.length}</span>
            </div>

            <div
                className={styles.viewportList}
                role="group"
                aria-label="Available viewport sizes"
            >
                {allViewports.map((viewport) => {
                    const Icon = icons[viewport.kind] ?? LuMonitor;

                    return (
                        <div
                            className={`${styles.viewportRow} ${viewport.kind === "custom" ? styles.viewportRowWithAction : ""}`}
                            key={viewport.id}
                        >
                            <button
                                className={`${styles.viewportButton} ${activeId === viewport.id ? styles.viewportActive : ""}`}
                                type="button"
                                aria-pressed={activeId === viewport.id}
                                onClick={() => onSelect(viewport)}
                            >
                                <span
                                    className={styles.viewportIcon}
                                    aria-hidden="true"
                                >
                                    <Icon />
                                </span>
                                <span className={styles.viewportText}>
                                    <span className={styles.viewportName}>
                                        {viewport.name}
                                    </span>
                                    <span className={styles.dimensions}>
                                        {viewport.width} × {viewport.height}
                                    </span>
                                </span>
                                {activeId === viewport.id && (
                                    <span
                                        className={styles.selectedDot}
                                        aria-label="Selected"
                                    />
                                )}
                            </button>
                            {viewport.kind === "custom" && (
                                <button
                                    className={styles.removeButton}
                                    type="button"
                                    aria-label={`Remove ${viewport.name}`}
                                    onClick={() => setRemoveTarget(viewport)}
                                >
                                    <LuTrash2 aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {!formOpen ? (
                <button
                    className={styles.addButton}
                    type="button"
                    onClick={openForm}
                    disabled={limitReached}
                >
                    <LuPlus aria-hidden="true" />
                    Add custom size
                </button>
            ) : (
                <form className={styles.customForm} onSubmit={handleSubmit}>
                    <div className={styles.formHeading}>
                        <h3>Add a custom size</h3>
                        <button
                            className={styles.closeButton}
                            type="button"
                            aria-label="Close custom size form"
                            onClick={closeForm}
                        >
                            <LuX aria-hidden="true" />
                        </button>
                    </div>
                    <label className={styles.field} htmlFor="custom-size-name">
                        Name
                        <input
                            id="custom-size-name"
                            type="text"
                            maxLength={24}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="My test size"
                        />
                    </label>
                    <div className={styles.dimensionFields}>
                        <label
                            className={styles.field}
                            htmlFor="custom-size-width"
                        >
                            Width
                            <input
                                id="custom-size-width"
                                type="number"
                                min="320"
                                max="2560"
                                step="1"
                                value={width}
                                onChange={(event) =>
                                    setWidth(event.target.value)
                                }
                            />
                        </label>
                        <label
                            className={styles.field}
                            htmlFor="custom-size-height"
                        >
                            Height
                            <input
                                id="custom-size-height"
                                type="number"
                                min="360"
                                max="1920"
                                step="1"
                                value={height}
                                onChange={(event) =>
                                    setHeight(event.target.value)
                                }
                            />
                        </label>
                    </div>
                    {error && (
                        <p className={styles.error} role="alert">
                            {error}
                        </p>
                    )}
                    <button className={styles.saveButton} type="submit">
                        Save size
                    </button>
                    <p className={styles.limitText}>
                        {customViewports.length} of {customViewportLimit} custom
                        sizes saved on this device.
                    </p>
                </form>
            )}
            <ConfirmationDialog
                open={Boolean(removeTarget)}
                title={`Remove ${removeTarget?.name ?? "custom size"}?`}
                description={
                    removeTarget
                        ? `This removes the ${removeTarget.width} by ${removeTarget.height} pixel size from this browser.`
                        : "This removes the custom size from this browser."
                }
                cancelLabel="Keep size"
                confirmLabel="Remove size"
                onCancel={() => setRemoveTarget(null)}
                onConfirm={() => {
                    if (removeTarget) {
                        onRemoveCustom(removeTarget.id);
                    }
                    setRemoveTarget(null);
                }}
            />
        </section>
    );
};

export default ViewportControls;
