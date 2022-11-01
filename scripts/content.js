function addAltwatchDiv(videoDetailsDiv) {
    avatarLink = videoDetailsDiv.querySelector("a[id='avatar-link']");
//        metaDiv = videoDetailsDiv.querySelector("div#meta");
    videoTitleLink = videoDetailsDiv.querySelector("a[id='video-title-link']")
    videoTitle = videoTitleLink.textContent;
    metaBlock = videoDetailsDiv.querySelector("div[id='meta']");

    // console.log("found: " + videoTitle);

    // First add a new div as the first child within the "details" box/div
    altwatchDiv = document.createElement("div");
    altwatchDiv.id="altwatch";
    altwatchDiv.style.display = "flex";
    altwatchDiv.style.flex = "auto";
//    altwatchDiv.style.background = "black";
//        videoDetailsDiv.style.background = "black";
    altwatchDiv.style['flex-direction'] = "column";
    videoDetailsDiv.insertBefore(altwatchDiv, avatarLink);
//    console.log("inserted altwatchDiv");

        // Now that the new div is attached to the dom, move the avatar link into the new div
    altwatchDiv.appendChild(avatarLink);
//    console.log("moved avatarLink into altwatch div");
    //    console.log("type of avatarLink: " + typeof(avatarLink) + " -- nodeName: " + avatarLink.nodeName);
        // now add a link button below the avatar link
    altwatchButtonLink = document.createElement("img");
    altwatchButtonLink.src = chrome.runtime.getURL("images/icon-48.png");
    altwatchButtonLink.height = 48;
    altwatchButtonLink.width = 48;
    altwatchDiv.appendChild(altwatchButtonLink);  // flex / column, below avatarLink
//    console.log("added altwatch button to altwatch div");
        // TODO: add onClick() to pop up iframe

        // TODO: Search Odysee, BlazeTV, Rumble, etc. etc. to find the identical title
        //  video (and channel/creator name if similar), grab the URLs, create an
        //  item in a map for popup content, and create a link/button beside/below
        //  the videoTitleLink to display an iframe popup with "View on OtherPlatform" links.

        // TODO: Use local storage in the browser to save a list of confirmed
        //  channel/creator mappings
        //  e.g. Hickock45 = rumble/real-hickock-45
        //  e.g. LouderWithCrowder = rumble/LouderCrowderFree
        //  etc.
}

function handleVideoDetailsDivs(videoDetailsDivs) {
    // `document.querySelector` may return null if the selector doesn't match anything.
    let modifiedCount = 0;
    videoDetailsDivs.forEach((videoDetailsDiv) => {
        // Check to see if the altwatch div has already been added
        existingAltwatchDiv = videoDetailsDiv.querySelector("div#altwatch");
        if (!existingAltwatchDiv) {
            addAltwatchDiv(videoDetailsDiv);
            modifiedCount++;
        }
    });
    if (modifiedCount > 0) {
        console.log("Modified: " + modifiedCount + " details divs of: " + videoDetailsDivs.length);
    }
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const videoDetailsDivs = document.querySelectorAll("div#details");
    // TODO: Make this wait for the entire page of thumbnails to finish loading
    //   before calling handleVideoDetailDivs.
    if (videoDetailsDivs && videoDetailsDivs.length > 0) {
        handleVideoDetailsDivs(videoDetailsDivs);
//        console.log("============= MUTATION OBSERVER EXECUTED ==================");
//        console.log("                  div count: " + videoDetailsDivs.length);
//        console.log("------------- MUTATION OBSERVER EXECUTED ------------------");
//        mutationInstance.disconnect();
    }
});


observer.observe(document, {
    childList: true,
    subtree:   true
});



