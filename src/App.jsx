import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell}>
        <header className={styles.header}>
            <a className={styles.brand} href="#top" aria-label="Breakframe home">
                <span className={styles.brandMark} aria-hidden="true">
                    B
                </span>
                <span>Breakframe</span>
            </a>
            <a
                className={styles.repositoryLink}
                href="https://github.com/a2rp/responsive-breakpoint-preview"
                target="_blank"
                rel="noreferrer"
            >
                Repository
            </a>
        </header>
        <main className={styles.pageContent} id="top">
            <section className={styles.introduction}>
                <h1>Test the width. See what changes.</h1>
                <p>
                    Preview a sample page at the screen sizes that matter to your
                    layout.
                </p>
            </section>
            <section className={styles.startPanel} aria-label="Preview workspace">
                <p>The responsive preview workspace is being assembled.</p>
            </section>
        </main>
    </div>
);

export default App;
