const networkConfig = {
    5: {
        name: "goerli",
        blockConfirmations: 6,
        ethToUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    80001: {
        name: "mumbai",
        blockConfirmations: 6,
        ethToUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    },
};

const testnetChainIds = [5, 80001];

module.exports = {
    networkConfig,
    testnetChainIds,
};
