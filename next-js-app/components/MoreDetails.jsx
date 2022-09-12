import styles from "../styles/Profile.module.css";

const MoreDetails = ({filecoinData, setFilecoinData}) => {
    const updateInfo = (e) => {
        setFilecoinData((data) => ({
            ...data,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div>
            <input
                id="description"
                onChange={updateInfo}
                value={filecoinData.description}
                className={styles.data_input}
                placeholder="Your description"
            ></input>
            <input
                id="funFact"
                onChange={updateInfo}
                value={filecoinData.funFact}
                className={styles.data_input}
                placeholder="Fun fact about you"
            ></input>{" "}
            <input
                id="contributersCountGoal"
                onChange={updateInfo}
                value={filecoinData.contributersCountGoal}
                className={styles.data_input}
                placeholder="Contributors count goal"
            ></input>{" "}
            <input
                id="contributedAmountGoal"
                onChange={updateInfo}
                value={filecoinData.contributedAmountGoal}
                className={styles.data_input}
                placeholder="Donated amount goal (in USD)"
            ></input>
        </div>
    );
};

export default MoreDetails;
