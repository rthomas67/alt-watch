const searchPlugins = {};

try {
    importScripts(
        "search_plugin_odysee.js",
         "search_plugin_rumble.js",
         "search_plugin_vimeo.js");
    for (const [key, value] of Object.entries(searchPlugins)) {
        console.log("Loaded plugin: " + key);
    }
} catch (e) {
     console.log(e);
}

chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        console.log("Processing message from: " +
            ((sender.tab) ?
                "content script:" + sender.tab.url :
                "within the extension"));
        console.log("Video Title: " + request.videoTitle);
        console.log("Content Creator Name: " + request.creatorName);
        responseObject = {
            targetDivId: request.targetDivId,
            alternativeVideoLinks: []
        };

        /*
         * Collect targetUrl results from each of the registered plugins and
         * add them to the response object.
         */
        for (const [key, pluginObject] of Object.entries(searchPlugins)) {
            const targetUrl = pluginObject.search(request.videoTitle, request.creatorName);
            console.log("Plugin result: " + key + " -> " + targetUrl);
            responseObject.alternativeVideoLinks.push({
                platform: key,
                targetUrl: targetUrl
            });
        }
        sendResponse(responseObject);
    }
);