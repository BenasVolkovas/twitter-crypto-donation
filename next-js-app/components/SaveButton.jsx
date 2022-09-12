import {useEffect, useState} from "react";
import {useNewMoralisObject, useMoralisQuery} from "react-moralis";
import styles from "../styles/Profile.module.css";

const SaveButton = ({username, address, filecoinData, setFilecoinCid, setAddress}) => {
    const [isNewCreator, setIsNewCreator] = useState(true);
    const {save} = useNewMoralisObject("TwitterUsers");
    const {fetch: moralisFetch} = useMoralisQuery(
        "TwitterUsers",
        (query) => query.equalTo("twitterUsername", username),
        [],
        {autoFetch: false}
    );

    useEffect(() => {
        if (username) {
            moralisFetch({
                onSuccess: (user) => {
                    if (user.length === 1) {
                        setIsNewCreator(false);
                        setAddress(user[0].attributes.metamaskWallet);
                    }
                },
            });
        }
    }, [username]);

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
        fetch("api/store-on-filecoin", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(filecoinData),
        })
            .then((res) => res.json())
            .then((data) => {
                setFilecoinCid(data.filecoinCid);
                setIsNewCreator(false);
            });
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
