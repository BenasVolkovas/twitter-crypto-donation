import styles from "../styles/Profile.module.css";

const ConnectWallet = ({login}) => {
    return (
        <button className={styles.connect_button} onClick={() => login()}>
            Connect Metamask Wallet
        </button>
    );
};
export default ConnectWallet;
