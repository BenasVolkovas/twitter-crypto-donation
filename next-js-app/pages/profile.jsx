import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {signOut, useSession, getSession} from "next-auth/react";
import {
    useAddress,
    ConnectWallet,
    Web3Button,
    useContract,
    useContractCall,
    useContractData,
} from "@thirdweb-dev/react";
import styles from "../styles/Profile.module.css";
import SaveButton from "../components/SaveButton";
import MoreDetails from "../components/MoreDetails";

const Profile = (props) => {
    const {contract} = useContract(props.twiptContract);
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
    const address = useAddress();

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
        setWalletAddress(address);
    }, [address]);

    useEffect(() => {
        if (filecoinCid) {
            // TODO save to smart contract
            console.log("add creator");
            console.log("error: ", twiptContractError);
            console.log("loading: ", twiptIsLoading);
        }
    }, [filecoinCid]);

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
                                    <ConnectWallet />
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

export const getServerSideProps = async () => {
    const twiptContract = process.env.NEXT_PUBLIC_TWIPT_CONTRACT;

    return {
        props: {
            twiptContract: twiptContract,
        },
    };
};

export default Profile;
