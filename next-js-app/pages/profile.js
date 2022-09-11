import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {signOut, useSession, getSession} from "next-auth/react";
import {useAddress, ConnectWallet, Web3Button} from "@thirdweb-dev/react";
import {connect} from "@tableland/sdk";
import styles from "../styles/Profile.module.css";
import {useNewMoralisObject} from "react-moralis";

const Profile = (props) => {
    const [twitterUsername, setTwitterUsername] = useState("");
    const {save} = useNewMoralisObject("TwitterUsers");
    const router = useRouter();
    const {data} = useSession();
    const address = useAddress();

    useEffect(() => {
        if (!data) {
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

    const saveUserObject = async () => {
        if (twitterUsername && address) {
            const dataToSave = {
                twitterUsername: twitterUsername,
                metamaskWallet: address,
            };

            save(dataToSave, {
                onSuccess: (monster) => {
                    // Execute any logic that should take place after the object is saved.
                    alert("New object created with objectId: " + monster.id);
                },
                onError: (error) => {
                    // Execute any logic that should take place if the save fails.
                    // error is a Moralis.Error with an error code and message.
                    alert("Failed to create new object, with error code: " + error.message);
                },
            });
        } else {
            alert("Twitter username or Metamask wallet is not added.");
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

                    <h1>
                        Welcome, <span className={styles.brand}>{data.user.name}</span>
                    </h1>
                    <br />

                    <h2>Steps to complete:</h2>
                    <br />

                    <div>
                        <div className={styles.done_task}>Done</div> Add Tiwitter account |{" "}
                        <span className={styles.info}>@{twitterUsername}</span>
                    </div>
                    <br />

                    <div>
                        {address ? (
                            <div className={styles.done_task}>Done</div>
                        ) : (
                            <div className={styles.todo_task}>To Do</div>
                        )}{" "}
                        Add Metamask wallet{" "}
                        {address && (
                            <>
                                | <span className={styles.info}>{address}</span>
                            </>
                        )}
                    </div>
                    <br />

                    {!address && <ConnectWallet />}
                    {twitterUsername && address ? (
                        <button onClick={() => saveUserObject()} className={styles.save_button}>
                            Save user to Moralis DB
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = async () => {
    const twiptContract = process.env.NEXT_PUBLIC_TWIPT_CONTRACT;

    return {
        props: {
            twiptContract: twiptContract,
        },
    };
};

export default Profile;
