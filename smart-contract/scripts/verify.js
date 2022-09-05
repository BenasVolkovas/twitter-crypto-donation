const {ethers, run, network} = require("hardhat");

const verify = async (contractAddress, args) => {
    if (
        (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) ||
        (network.config.chainId === 80001 && process.env.POLYGONSCAN_API_KEY)
    ) {
        console.log("Verifying contract...");

        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: args,
            });
        } catch (e) {
            if (e.message.toLowerCase().includes("already verified")) {
                console.log("Already verified!");
            } else {
                console.log(e);
            }
        }
    }
};

module.exports = {
    verify,
};
