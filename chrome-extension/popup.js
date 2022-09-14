document.addEventListener("DOMContentLoaded", async () => {
    console.log("super");
    await getCurrentTab();
});

const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab;
};
