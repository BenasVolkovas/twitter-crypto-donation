import {useEffect} from "react";
import {useMoralis} from "react-moralis";

const ConnectWallet = ({login}) => {
    return <button onClick={() => login()}>Connect Metamask Wallet</button>;
};
export default ConnectWallet;
