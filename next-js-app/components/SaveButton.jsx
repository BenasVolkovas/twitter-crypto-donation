import {useEffect, useState} from "react";
import {useNewMoralisObject, useMoralisQuery, useMoralis} from "react-moralis";
import styles from "../styles/Profile.module.css";
import contractAbi from "../utils/Twipt.json";

const SaveButton = ({username, address, filecoinData, setFilecoinCid, setAddress}) => {
    const {Moralis, isWeb3Enabled, enableWeb3} = useMoralis();
    const [isNewCreator, setIsNewCreator] = useState(true);
    const {save} = useNewMoralisObject("TwitterUsers");
    const {fetch: moralisFetch} = useMoralisQuery(
        "TwitterUsers",
        (query) => query.equalTo("twitterUsername", username),
        [],
        {autoFetch: false}
    );

    useEffect(() => {
        console.log("enabled: ", isWeb3Enabled);
        if (username && isWeb3Enabled) {
            moralisFetch({
                onSuccess: (user) => {
                    console.log(user[0].attributes.metamaskWallet);
                    if (user.length === 1 && setIsNewCreator) {
                        setAddress(user[0].attributes.metamaskWallet);
                        getCreator(user[0].attributes.metamaskWallet);
                        setIsNewCreator(false);
                    }
                },
            });
        }
    }, [username, isWeb3Enabled]);

    const getCreator = async (providedAddress) => {
        console.log("address ", providedAddress);

        const sendOptions = {
            contractAddress: process.env.NEXT_PUBLIC_TWIPT_CONTRACT,
            functionName: "getCreatorInfo",
            abi: contractAbi,
            params: {_wallet: providedAddress},
        };
        const creatorData = await Moralis.executeFunction(sendOptions);
        console.log("creatorData ", creatorData);
        setFilecoinCid(creatorData.filecoinCid);
    };

    const saveUserObject = () => {
        if (username && address && filecoinData) {
            moralisFetch({
                onSuccess: (user) => {
                    if (user.length === 0) {
                        const dataToSave = {
                            twitterUsername: username,
                            metamaskWallet: address,
                        };

                        save(dataToSave, {
                            onSuccess: (user) => {
                                console.log("New object created with objectId: " + user.id);
                                storeFilecoinData();
                            },
                            onError: (error) => {
                                alert(
                                    "Failed to create new object, with error code: " +
                                        error.message
                                );
                            },
                        });
                    }
                },
            });
        } else {
            alert("Twitter username or Metamask wallet is not added.");
        }
    };

    const storeFilecoinData = () => {
        fetch(`${process.env.NEXT_PUBLIC_DAPP_DOMAIN}/api/store-on-filecoin`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(filecoinData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Filecoin data: ", data);
                setFilecoinCid(data.filecoinCid);
                addNewCreator(data.filecoinCid);
                setIsNewCreator(false);
            })
            .catch((e) => alert(e));
    };

    const addNewCreator = async (cid) => {
        if (!isWeb3Enabled) {
            await enableWeb3();
        }
        const sendOptions = {
            contractAddress: process.env.NEXT_PUBLIC_TWIPT_CONTRACT,
            functionName: "addCreator",
            abi: contractAbi,
            params: {
                _filecoinCid: cid,
            },
        };
        await Moralis.executeFunction(sendOptions);
    };

    return (
        <>
            {isNewCreator ? (
                <button onClick={() => saveUserObject()} className={styles.save_button}>
                    Save user to Moralis DB
                </button>
            ) : (
                <h3>You are all set up and can start receiving donations!</h3>
            )}
        </>
    );
};

export default SaveButton;
