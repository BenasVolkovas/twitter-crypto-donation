// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

error Twipt__FailedToTransferEther();

contract Twipt is Ownable {
    struct Creator {
        string filecoinCid;
        uint256 contributors;
        uint256 contributedAmount;
    }

    AggregatorV3Interface internal priceFeed;
    mapping(address => Creator) public creators;

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    receive() external payable {}

    fallback() external payable {}

    function addCreator(string memory _filecoinCid) external {
        creators[msg.sender].filecoinCid = _filecoinCid;
    }

    function oneTimeDonation(address _creator) external payable {
        creators[_creator].contributors += 1;
        creators[_creator].contributedAmount += msg.value;

        (bool success, ) = _creator.call{value: msg.value}("");
        if (!success) revert Twipt__FailedToTransferEther();
    }

    function getCreatorInfo(address _wallet) external view returns (uint256, uint256, string memory) {
        Creator memory creator = creators[_wallet];

        console.log("contributors left");
        uint256 contributors = creator.contributors;
        console.log("contributors amount left");
        uint256 contributedAmountInUsd = ethAmountInUsd(creator.contributedAmount);
        console.log("filecoin left");
        string memory filecoinCid = creator.filecoinCid;

        return (contributors, contributedAmountInUsd, filecoinCid);
    }

    function usdAmountInEth(uint256 _usdAmount) public view returns (uint256 ethAmount) {
        ethAmount = (_usdAmount * 1 ether) / getPrice();
    }

    function ethAmountInUsd(uint256 _ethAmount) public view returns (uint256 usdAmount) {
        usdAmount = (_ethAmount * getPrice()) / 1 ether;
    }

    function getPrice() public view returns (uint256 realPrice) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        realPrice = uint256(price) * 10 ** 10;
    }
}
