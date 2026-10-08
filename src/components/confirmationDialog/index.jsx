import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";
import styles from "./styles.module.css";

const ConfirmationDialog = ({
    open,
    title,
    description,
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    onCancel,
    onConfirm,
}) => {
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        previousFocusRef.current = document.activeElement;
        cancelRef.current?.focus();

        return () => {
            if (previousFocusRef.current?.isConnected) {
                previousFocusRef.current.focus();
            }
        };
    }, [open]);

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            onCancel();
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const controls = dialogRef.current?.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const firstControl = controls?.[0];
        const lastControl = controls?.[controls.length - 1];

        if (event.shiftKey && document.activeElement === firstControl) {
            event.preventDefault();
            lastControl?.focus();
        } else if (!event.shiftKey && document.activeElement === lastControl) {
            event.preventDefault();
            firstControl?.focus();
        }
    };

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    };

    if (!open) {
        return null;
    }

    return createPortal(
        <div
            className={styles.dialogBackdrop}
            onMouseDown={handleBackdropClick}
        >
            <div
                className={styles.confirmationDialog}
                ref={dialogRef}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirmation-title"
                aria-describedby="confirmation-description"
                onKeyDown={handleKeyDown}
            >
                <div className={styles.dialogHeading}>
                    <h2 id="confirmation-title">{title}</h2>
                    <button
                        className={styles.closeButton}
                        type="button"
                        aria-label="Close dialog"
                        onClick={onCancel}
                    >
                        <LuX aria-hidden="true" />
                    </button>
                </div>
                <p id="confirmation-description">{description}</p>
                <div className={styles.dialogActions}>
                    <button
                        className={styles.cancelButton}
                        type="button"
                        ref={cancelRef}
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        className={styles.confirmButton}
                        type="button"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default ConfirmationDialog;
