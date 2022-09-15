import {useEffect} from "react";
import {useMoralis, useMoralisQuery} from "react-moralis";
import Head from "next/head";
import styles from "../../styles/Creator.module.css";
import {useRouter} from "next/router";

import CreatorDetails from "../../components/CreatorDetails";
import UserWallet from "../../components/UserWallet";
import DonateAction from "../../components/DonateAction";

const Creator = () => {
    const router = useRouter();
    const {username} = router.query;
    const {isWeb3Enabled, enableWeb3, isInitialized} = useMoralis();

    useEffect(() => {
        const login = async () => {
            if (!isWeb3Enabled) {
                await enableWeb3();
            }
        };

        login();
    }, []);

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
                <DonateAction />
            </div>
        </div>
    );
};

export default Creator;
