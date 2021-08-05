console.log(`hello world`);
browser.runtime.onMessage.addListener(request => {
    console.log(request.urls);
    for (const url of request.urls) {
        alert(url);
    }

    return Promise.resolve({ response: "Hi from content script" });
});


// generate DOM
function generate() {
    const div = document.createElement("div");
}