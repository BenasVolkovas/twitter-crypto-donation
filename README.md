<!--
User 1
User logins with twitter account.
User logins with metamask account.
After metamask gets the wallet address, store twitter and wallet address in filecoin.

User 2
Open twitter profile.
Check if metamask is installed.
If user data found in filecoin {
    Modify DOM and add button near the profile follow.
    If button is clicked {
        Open the popup (not where extensions open, but near the donate button)
        Display availability to donate money for the twitter user.
        Option 1 donate the wanted amount in USD (use chainlink price feed)
        Option 2 subscribe to the user and donate the wanted amount in wanted time period

        After confirming transaction (use moralis events), show the success message.
    }
}
-->
