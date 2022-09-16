const networkConfig = {
    5: {
        name: "goerli",
        blockConfirmations: 6,
        ethToUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    80001: {
        name: "mumbai",
        blockConfirmations: 6,
        ethToUsdPriceFeed: "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
    },
};

const testnetChainIds = [5, 80001];

module.exports = {
    networkConfig,
    testnetChainIds,
};
