import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { useWeb3 } from "@3rdweb/hooks";
import styles from "../styles/Profile.module.css";

export default function Profile() {
    const router = useRouter();
    const { data } = useSession();
    const { connectWallet, address, error } = useWeb3();

    useEffect(() => {
        if (!data) {
            router.push("/");
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

            {data && (
                <div>
                    <button className={styles.logout} onClick={() => signOut()}>
                        Sign out
                    </button>

                    <h1>
                        Welcome,{" "}
                        <span className={styles.brand}>{data.user.name}</span>
                    </h1>
                    <h2>Logged in as {data.user.email}</h2>

                    <br />
                    <h1>Steps to complete:</h1>
                    <ol>
                        <li>
                            <span className={styles.done_task}>(Done)</span> Add
                            Tiwitter account
                        </li>
                        <li>
                            <span className={styles.todo_task}>(To Do)</span>{" "}
                            Add Metamask wallet{" "}
                            <button onClick={() => connectWallet("injected")}>
                                Authenticate with Metamask
                            </button>
                        </li>
                    </ol>
                    {address && <h3>{address}</h3>}
                </div>
            )}
        </div>
    );
}
