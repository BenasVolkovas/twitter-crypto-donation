import {useEffect, useMemo} from "react";
import {useMoralis, useMoralisQuery} from "react-moralis";
import Head from "next/head";
import styles from "../../styles/Creator.module.css";
import {useRouter} from "next/router";

import CreatorDetails from "../../components/CreatorDetails";
import UserWallet from "../../components/UserWallet";

const Creator = () => {
    const router = useRouter();
    const {username} = router.query;
    const {isWeb3Enabled, enableWeb3, isInitialized, Moralis} = useMoralis();

    useEffect(() => {
        const login = async () => {
            await enableWeb3();
        };

        login();
    }, []);

    useEffect(() => {
        const checkChainId = async () => {
            const chainId = await Moralis.getChainId();
            if (parseInt(chainId, 16) !== 80001) {
                alert("Choose Mumbai network to continue!");
            }
        };

        if (isWeb3Enabled) {
            checkChainId();
        }
    }, [isWeb3Enabled]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Twipt</title>
                <meta name="description" content="Twitter Crypto Donation App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <UserWallet />
                {isInitialized && <CreatorDetails />}
            </div>
        </div>
    );
};

export default Creator;
