console.log(`hello world`);
browser.runtime.onMessage.addListener(request => {
    console.log(request.url);
    alert(request.url);
    return Promise.resolve({ response: "Hi from content script" });
}); 