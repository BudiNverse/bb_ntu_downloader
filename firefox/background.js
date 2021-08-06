const REGEX = new RegExp('https:\/\/.+\/.+m3u8$')
const FOUND_URLS = {}

function logURL(requestDetails) {
    const matches = REGEX.test(requestDetails.url);
    if (matches) {
        console.log("Match: " + requestDetails.url);
        FOUND_URLS[requestDetails.tabId] = requestDetails.url;
        console.log(FOUND_URLS);
    }
}

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            { url: FOUND_URLS[tab.id] }
        )
        .then(response =>console.log(`Content Script Msg: ${response.response}`))
        .catch(onError);
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
