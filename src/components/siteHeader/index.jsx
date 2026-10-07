import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuPanelsTopLeft, LuMenu, LuX } from "react-icons/lu";
import styles from "./styles.module.css";

const navigation = [
    { label: "Preview", href: "#preview" },
    { label: "Sizes", href: "#sizes" },
    { label: "Guide", href: "#guide" },
];

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.siteHeader} ref={headerRef}>
            <div className={styles.headerInner}>
                <a className={styles.brand} href="#top" onClick={closeMenu}>
                    <span className={styles.brandMark} aria-hidden="true">
                        <LuPanelsTopLeft />
                    </span>
                    <span>Breakframe</span>
                </a>
                <nav
                    className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
                    id="main-navigation"
                    aria-label="Main navigation"
                >
                    {navigation.map((item) => (
                        <a key={item.href} href={item.href} onClick={closeMenu}>
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className={styles.headerActions}>
                    <a
                        className={styles.repositoryLink}
                        href="https://github.com/a2rp/responsive-breakpoint-preview"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub aria-hidden="true" />
                        <span>Repository</span>
                    </a>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        aria-expanded={menuOpen}
                        aria-controls="main-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;
