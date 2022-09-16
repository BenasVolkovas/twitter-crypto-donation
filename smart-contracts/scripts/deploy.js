const {verify} = require("./verify");
const {testnetChainIds, networkConfig} = require("../helper-hardhat-config");
const {ethers, network} = require("hardhat");

const main = async () => {
    if (testnetChainIds.includes(network.config.chainId)) {
        console.log("Deploying on ", network.name)
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        creator = accounts[1];
        contributor = accounts[2];

        const priceFeedAddress = networkConfig[network.config.chainId].ethToUsdPriceFeed;
        console.log("feed: ", priceFeedAddress)
        const twiptFactory = await ethers.getContractFactory("Twipt", deployer);
        const twipt = await twiptFactory.deploy(priceFeedAddress);
        await twipt.deployed();
        console.log("Twipt deployed to address: ", twipt.address);

        await twipt.deployTransaction.wait(6);
        await verify(twipt.address, [priceFeedAddress]);
    } else {
        console.log("Not a testnet chain.");
        console.log("Your chain is - ", network.name);
    }
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
