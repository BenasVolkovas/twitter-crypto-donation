chrome.storage.sync.set({ isLoggedIn: false, else: false });

chrome.storage.sync.get("isLoggedIn", (isLoggedIn) => {
    // console.log(isLoggedIn);
});
