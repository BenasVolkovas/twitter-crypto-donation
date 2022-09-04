import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/Login.module.css";

export default function Login() {
    const router = useRouter();
    const { data } = useSession();

    useEffect(() => {
        if (data) {
            router.push("/profile");
        }
    }, [data]);

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
            <div className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <span className={styles.brand}>Twipt</span>
                </h1>

                <p className={styles.description}>
                    Donate crypto for creators on Twitter at ease!
                </p>

                {!data && (
                    <button onClick={() => signIn()}>
                        Sign in with Twitter
                    </button>
                )}
            </div>
        </div>
    );
}
