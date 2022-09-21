# Twipt

[![logo128.png](https://i.postimg.cc/c40yHBCM/logo128.png)](https://postimg.cc/XXHD1Fwp)

## Donate crypto for creators on Twitter at ease!

# Problem (the need, the pain)
It's hard for creators on Twitter to easily get donations from followers. Some creators use ENS or Unstoppable Domains to get shorter wallet addresses, but those addresses still need to be shared to old and new followers instantly.

# Solution
The chrome extension that allows followers (without web3 knowledge) to donate crypto to creators through Twitter platform. This bridges the web2 and web3 technologies.

## How creator can start receiving donations?
1. Login with Twitter
2. Connect with Metamask wallet
3. Add more info about personal things

## How follower can donate?
1. Open creator on Twitter 
2. Open Twipt chrome extension
3. Click donate
4. Read more details about the creator
5. Write the amount to donate in USD
6. Click donate and confirm the transaction

# Target market
Twipt target market is creators on Twitter platform, who wants to start receiving donations easily in crypto. Main market is verified users on Twitter, who have more than 100k followers, constantly create free content and don't have many streams of income.

# Business model
Twipt is currently totally free, which means followers will only need to pay for the transaction fee. In the near future, Twipt is going to introduce a small fee of 1%.

# Current state (features already added)
## Next.js app

-   [x] Twitter login
-   [x] Twitter logout
-   [x] Metamask login
-   [x] Store Twitter username and Metamask wallet address in Moralis database
-   [x] Save Filecoin cid and creator details in Twipt smart contract
-   [x] Store details of creator on Filecoin
-   [x] Retrieve data from Twipt smart contract
-   [x] Retrieve data from Filecoin
-   [x] Donate form for followers
  
## Chrome Extension

-   [x] **Donate** button for creators on Twipt

## Smart contract

-   [x] Add new creator with Filecoin cid
-   [x] Donate to creator
-   [x] Get details about creator (convert MATIC value to USD)
  
## Tool usage
-   [x] Polygon testnet Mumbai
-   [x] Filecoin storage (Web3.storage)
-   [x] Chainlink price feeds (MATIC/USD)
-   [x] Moralis database
-   [x] Twitter authentication

# Features to be added
-   [ ] Recurring donations
-   [ ] Multichain compatibility
-   [ ] Multiple tokens compatibility
