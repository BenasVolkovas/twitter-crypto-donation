import {useEffect} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {signOut, useSession} from "next-auth/react";
import {useAddress, ConnectWallet, Web3Button} from "@thirdweb-dev/react";
import styles from "../styles/Profile.module.css";

export default function Profile() {
    const contractAddress = "0x4F13FC32C582C1C7eDa2863Fbc996405FAcB45c4";
    const router = useRouter();
    const {data} = useSession();
    const address = useAddress();

    useEffect(() => {
        if (!data) {
            router.push("/");
        }
    }, [data]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Twipt</title>
                <meta name="description" content="Twitter Crypto Donation App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {data && (
                <div>
                    <button className={styles.logout} onClick={() => signOut()}>
                        Sign out
                    </button>

                    <h1>
                        Welcome, <span className={styles.brand}>{data.user.name}</span>
                    </h1>
                    <h2>Logged in as {data.user.email}</h2>

                    <br />
                    <h1>Steps to complete:</h1>
                    <br />
                    <div>
                        <div className={styles.done_task}>Done</div> Add Tiwitter account
                    </div>
                    <br />
                    <div>
                        <div className={styles.todo_task}>To Do</div> Add Metamask wallet{" "}
                        <ConnectWallet />
                    </div>
                </div>
            )}
        </div>
    );
}
