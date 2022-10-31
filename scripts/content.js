const videoTitleLinks = document.querySelectorAll("a[id='video-title-link']");

// `document.querySelector` may return null if the selector doesn't match anything.
videoTitleLinks.forEach((videoTitleLink) => {
    videoTitle = videoTitleLink.textContent;
    detailsBox = videoTitleLink.closest("div[id='details']");
    avatarLink = detailsBox.querySelector("a[id='avatar-link']");
    altWatchDiv = document.createElement("div");
//    console.log("type of avatarLink: " + typeof(avatarLink) + " -- nodeName: " + avatarLink.nodeName);
    altWatchButtonLink = document.createElement("img");
    altWatchButtonLink.src = chrome.runtime.getURL("images/icon-48.png");
    altWatchDiv.appendChild(altWatchButtonLink);
    altWatchDiv.height = 48;
    altWatchDiv.width = 48;
    altWatchDiv.style.float = "left";
    // TODO: add onClick() to pop up iframe
    avatarLink.after(altWatchDiv);

    // TODO: Search Odysee, BlazeTV, Rumble, etc. etc. to find the identical title
    //  video (and channel/creator name if similar), grab the URLs, create an
    //  item in a map for popup content, and create a link/button beside/below
    //  the videoTitleLink to display an iframe popup with "View on OtherPlatform" links.

    // TODO: Use local storage in the browser to save a list of confirmed
    //  channel/creator mappings
    //  e.g. Hickock45 = rumble/real-hickock-45
    //  e.g. LouderWithCrowder = rumble/LouderCrowderFree
    //  etc.
});
