import Head from "next/head";
import styles from "../styles/Login.module.css";

export default function Login() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Twipt</title>
                <meta
                    name="description"
                    content="Twitter Crypto Donation App"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <span className={styles.brand}>Twipt</span>
                </h1>

                <p className={styles.description}>
                    Donate crypto for creators on twitter at ease!
                </p>
            </main>
        </div>
    );
}
