import {useMemo} from "react";
import {useMoralis} from "react-moralis";
import styles from "../styles/Creator.module.css";

const UserWallet = () => {
    const {account} = useMoralis();
    const realAccount = useMemo(
        () =>
            account
                ? `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`
                : "",
        [account]
    );

    return (
        <div className={styles.user_wallet}>
            {realAccount ? `Wallet: ${realAccount}` : "Not Logged In"}
        </div>
    );
};

export default UserWallet;
