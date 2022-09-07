import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {signOut, useSession} from "next-auth/react";
import {useAddress, ConnectWallet, Web3Button} from "@thirdweb-dev/react";
import {connect} from "@tableland/sdk";
import styles from "../styles/Profile.module.css";
import {getContractPublisherAddress} from "@thirdweb-dev/sdk";

const Profile = () => {
    const contractAddress = "0x4F13FC32C582C1C7eDa2863Fbc996405FAcB45c4";
    const [tableland, setTableland] = useState();
    const [tableName, setTableName] = useState();
    const router = useRouter();
    const {data} = useSession();
    const address = useAddress();

    useEffect(() => {
        if (!data) {
            router.push("/");
        }
    }, [data]);

    const connectTableland = async () => {
        const tablelandConnection = await connect({network: "testnet", chain: "polygon-mumbai"});
        await tablelandConnection.siwe();

        setTableland(tablelandConnection);
    };

    const createTable = async () => {
        const {name} = await tableland.create(
            `username text, wallet text, primary key (username)`,
            `username_wallet`
        );
        console.log(name);
        setTableName(name);
    };

    const getTables = async () => {
        const tables = await tableland.list();
        console.log(tables);
    };

    const putWalletToTableland = async () => {
        const key = data.user.name;
        const value = address;
        console.log(key, " => ", value);
        if (key && value) {
            const response = await tableland.write(
                `INSERT INTO ${tableName} VALUES (${key}, '${value}');`
            );
            console.log(response);
        }
    };

    const getUsernameFromTableland = async () => {
        const key = data.user.name;
        const value = await tableland.read(`SELECT * FROM ${tableName} WHERE username = ${key}`);
        const response = await tableland.rows[0];
        console.log(response);
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
                    <button onClick={() => connectTableland()}>Tableland</button>
                    <button onClick={() => createTable()}>Create table</button>
                    <button onClick={() => getTables()}>Get tables</button>
                    <button onClick={() => putWalletToTableland()}>Put wallet</button>
                    <button onClick={() => getUsernameFromTableland()}>Get username</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
