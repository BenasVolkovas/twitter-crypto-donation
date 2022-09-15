const donationDomain = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
    const [isTwitterWeb, username] = await getCurrentUser();
    const infoDiv = document.getElementById("info");

    if (isTwitterWeb) {
        const donateButton = document.createElement("button");
        donateButton.innerHTML = `Donate to @${username}`;
        donateButton.classList.add("donate_button");
        infoDiv.append(donateButton);

        donateButton.addEventListener("click", () => {
            window.open(`${donationDomain}/creators/${username}`, "_blank");
        });
    } else {
        const noTwitterText = document.createElement("p");
        noTwitterText.innerHTML = "Not a Twitter website.";
        noTwitterText.classList.add("info_text");
        infoDiv.append(noTwitterText);
    }
});

// Returns [isTwitterWeb, username]
const getCurrentUser = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    if (tab.url.startsWith("https://twitter.com/")) {
        return [true, tab.url.split(".com/")[1]];
    } else {
        return [false, ""];
    }
};
