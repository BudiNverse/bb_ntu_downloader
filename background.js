const REGEX = new RegExp('https:\/\/.+\/.+m3u8$')
const FOUND_URLS = new Set()

function logURL(requestDetails) {
    const matches = REGEX.test(requestDetails.url);
    if (matches) {
        console.log("Match: " + requestDetails.url);
        FOUND_URLS.add(requestDetails.url);
    }
}

function sendMessageToTabs(tabs) {
    if (FOUND_URLS.size > 0) {
        for (let tab of tabs) {
            browser.tabs.sendMessage(
                tab.id,
                { urls: FOUND_URLS }
            ).then(response => {
                console.log(`Content Script Msg: ${response.response}`);
            }).catch(onError);
        }
        // clear buffer if its bigger than 5
        if (FOUND_URLS.size >= 5) {
            FOUND_URLS.clear()
        }
    }
}

function onError(error) {
    console.error(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
});

browser.webRequest.onBeforeRequest.addListener(
    logURL,
    { urls: ["<all_urls>"] }
);