import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader/index.jsx";

const App = () => (
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
            <section className={styles.startPanel} aria-label="Preview workspace">
                <p>The responsive preview workspace is being assembled.</p>
            </section>
        </main>
    </div>
);

export default App;
