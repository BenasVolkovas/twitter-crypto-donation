import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useMoralisQuery, useMoralis} from "react-moralis";
import styles from "../styles/Creator.module.css";
import contractAbi from "../utils/Twipt.json";

const CreatorDetails = () => {
    const router = useRouter();
    const {username} = router.query;
    const [creatorWallet, setCreatorWallet] = useState("");
    const {Moralis, isWeb3Enabled, enableWeb3} = useMoralis();
    const [filecoinData, setFilecoinData] = useState({
        description: "",
        funFact: "",
        contributersCountGoal: "",
        contributedAmountGoal: "",
    });
    const [statisticsData, setStatisticsData] = useState({
        contributors: 0,
        contributedAmount: 0,
    });

    useEffect(() => {
        if (username) {
            const fetchWallet = async () => {
                const TwitterUser = Moralis.Object.extend("TwitterUsers");
                const query = new Moralis.Query(TwitterUser);
                query.equalTo("twitterUsername", username);
                const results = await query.find();
                setCreatorWallet(results[0].attributes.metamaskWallet);
            };

            fetchWallet();
        }
    }, [username]);

    useEffect(() => {
        const getFilecoinData = async () => {
            if (!isWeb3Enabled) {
                await enableWeb3();
            } else {
                const sendOptions = {
                    contractAddress: process.env.NEXT_PUBLIC_TWIPT_CONTRACT,
                    functionName: "getCreatorInfo",
                    abi: contractAbi,
                    params: {
                        _wallet: creatorWallet,
                    },
                };

                const creatorData = await Moralis.executeFunction(sendOptions);
                console.log(creatorData);
                setStatisticsData({
                    contributors: creatorData.contributors.toNumber(),
                    contributedAmount: creatorData.contributedAmountInUsd.toNumber(),
                });

                fetch(`${process.env.NEXT_PUBLIC_DAPP_DOMAIN}/api/get-from-filecoin`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PUT",
                    body: JSON.stringify(creatorData.filecoinCid),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setFilecoinData(JSON.parse(data));
                    });
            }
        };

        if (creatorWallet) {
            getFilecoinData();
        }
    }, [creatorWallet, isWeb3Enabled]);

    useEffect(() => {
        console.log(filecoinData);
    }, [filecoinData]);

    return (
        <>
            <h1>
                More info about <span className={styles.brand}>@{username}</span>
            </h1>
            <div className={styles.section}>Description: {filecoinData.description}</div>
            <div className={styles.section}>Fun fact: {filecoinData.funFact}</div>
            <br />
            <div className={styles.section}>
                Contributors count goal: {filecoinData.contributersCountGoal}
            </div>
            <div className={styles.section}>
                Current contributors count: {statisticsData.contributors}
            </div>
            <br />
            <div className={styles.section}>
                Contributed amount goal: {filecoinData.contributedAmountGoal}
            </div>
            <div className={styles.section}>
                Current contributed amount: {statisticsData.contributedAmount}
            </div>
        </>
    );
};

export default CreatorDetails;
