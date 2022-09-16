import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {signOut, useSession, getSession} from "next-auth/react";
import {useMoralis} from "react-moralis";
import styles from "../styles/Profile.module.css";
import SaveButton from "../components/SaveButton";
import MoreDetails from "../components/MoreDetails";
import ConnectWallet from "../components/ConnectWallet";

const Profile = () => {
    const [filecoinData, setFilecoinData] = useState({
        description: "",
        funFact: "",
        contributersCountGoal: "",
        contributedAmountGoal: "",
    });
    const [filecoinCid, setFilecoinCid] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [twitterUsername, setTwitterUsername] = useState("");
    const router = useRouter();
    const {data} = useSession();
    const {enableWeb3, isWeb3Enabled, account} = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) setWalletAddress(account);
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (data === null) {
            router.push("/");
        } else if (data?.user?.id) {
            fetch("api/twitter-user", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({twitterId: data.user.id}),
            })
                .then((res) => res.json())
                .then((data) => {
                    setTwitterUsername(data.username);
                });
        }
    }, [data]);

    useEffect(() => {
        login();
    }, []);

    const login = async () => {
        if (!isWeb3Enabled) {
            await enableWeb3();
        }
    };

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

                    <h1 className={styles.new_section}>
                        Welcome, <span className={styles.brand}>{data.user.name}</span>
                    </h1>

                    <h3 className={styles.new_section}>Steps to complete:</h3>

                    <div className={styles.mini_section}>
                        <div className={styles.done_task}>Done</div>Add Tiwitter account |{" "}
                        <span className={styles.info}>@{twitterUsername}</span>
                    </div>

                    <div className={styles.mini_section}>
                        {walletAddress ? (
                            <>
                                <div className={styles.done_task}>Done</div>
                                Add Metamask wallet |{" "}
                                <span className={styles.info}>{walletAddress}</span>
                            </>
                        ) : (
                            <>
                                <div className={styles.todo_task}>To Do</div>
                                Add Metamask wallet
                                <div className={styles.mini_section}>
                                    <ConnectWallet login={login} />
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.mini_section}>
                        {filecoinCid ? (
                            <>
                                <div className={styles.done_task}>Done</div>
                                Add more details about yourself |{" "}
                                <span className={styles.info}>{filecoinCid}</span>
                            </>
                        ) : (
                            <>
                                <div className={styles.todo_task}>To Do</div>
                                Add more details about yourself
                                <div className={styles.mini_section}>
                                    <MoreDetails
                                        setFilecoinData={setFilecoinData}
                                        filecoinData={filecoinData}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {twitterUsername && (
                        <SaveButton
                            username={twitterUsername}
                            address={walletAddress}
                            filecoinData={filecoinData}
                            setFilecoinCid={setFilecoinCid}
                            setAddress={setWalletAddress}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
