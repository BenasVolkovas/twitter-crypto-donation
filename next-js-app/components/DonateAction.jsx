import {useState} from "react";
import {useMoralisQuery, useMoralis} from "react-moralis";
import styles from "../styles/Creator.module.css";
import contractAbi from "../utils/Twipt.json";
import {utils} from "ethers";
const DonateAction = ({creatorWallet}) => {
    const [amount, setAmount] = useState(0);
    const {Moralis, isWeb3Enabled, enableWeb3} = useMoralis();

    const updateAmount = (e) => {
        setAmount(e.target.value);
    };

    const convertUsdToEth = async () => {
        const sendOptions = {
            contractAddress: process.env.NEXT_PUBLIC_TWIPT_CONTRACT,
            functionName: "usdAmountInEth",
            abi: contractAbi,
            params: {
                _usdAmount: utils.parseEther(String(amount)),
            },
        };

        const amountInEthBN = await Moralis.executeFunction(sendOptions);
        const amountInEth = amountInEthBN.toString();
        return amountInEth;
    };

    const donate = async () => {
        await enableWeb3();
        const ethValue = await convertUsdToEth();
        const sendOptions = {
            contractAddress: process.env.NEXT_PUBLIC_TWIPT_CONTRACT,
            functionName: "oneTimeDonation",
            abi: contractAbi,
            params: {
                _creator: creatorWallet,
            },
            msgValue: ethValue,
        };

        const creatorData = await Moralis.executeFunction(sendOptions);
        console.log(creatorData);
    };

    return (
        <div className={styles.form}>
            <h2>Donate to Creator</h2>
            <input
                id="donateAmount"
                onChange={updateAmount}
                value={amount}
                className={styles.data_input}
                placeholder="Amount to donate (in USD)"
                type="number"
            ></input>
            <button className={styles.donate_btn} onClick={() => donate()}>
                Donate
            </button>
        </div>
    );
};

export default DonateAction;
