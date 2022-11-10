const button32url = chrome.runtime.getURL("images/icon-32.png");
const vimeo32url = chrome.runtime.getURL("images/platform-vimeo-32.png");
const odysee32url = chrome.runtime.getURL("images/platform-odysee-32.png");
const rumble32url = chrome.runtime.getURL("images/platform-rumble-32.png");
const image32Urls = {
    "odysee": odysee32url,
    "rumble": rumble32url,
    "vimeo": vimeo32url
}

function createUUID() {
    // See: https://www.arungudelli.com/tutorial/javascript/how-to-create-uuid-guid-in-javascript-with-examples/
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function addAltwatchDiv(videoDetailsDiv, avatarLink) {
    metaDiv = videoDetailsDiv.querySelector("div#meta");
    videoTitleLink = videoDetailsDiv.querySelector("a[id='video-title-link']");
    videoTitle = (videoTitleLink) ? videoTitleLink.textContent : "unknown";
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
    altwatchButtonLink = document.createElement("a");
    altwatchButtonLink.setAttribute("data-rel", "popup");
    altwatchButtonLink.setAttribute("onclick","return false;");
    altwatchButtonImg = document.createElement("img");
    altwatchButtonImg.src = button32url;
    altwatchButtonLink.width = 32;
    altwatchButtonLink.style.marginLeft = "4px";  // prevents 32x32 graphic from going all the way to the left side of the 48x? box.
    altwatchButtonLink.appendChild(altwatchButtonImg);
    altwatchDiv.appendChild(altwatchButtonLink);  // flex / column, below avatarLink
    createAltwatchLinksPopup(videoTitle, altwatchDiv, altwatchButtonLink);
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

/**
 * Creates a hidden popup div appended to the "altwatchDiv" and attaches a handler
 * to the button input element that results in popping up the div as a modal dialog.
 */
function createAltwatchLinksPopup(videoTitle, altwatchDiv, altwatchButtonLink) {
    // TODO:  Finish populating popup content based on result from alternate video platform site searches
    //   Note: Without using search APIs (requiring api-keys), screen-scraping the response from
    //   an XMLHttpRequest might be the only option here.
    //   See:
    altwatchLinkPopupDiv = document.createElement("div");
    altwatchLinkPopupDiv.style.zIndex = "3000 !important";  // be sure it appears on top of all the yt 2000+ z-indexes
    altwatchLinkPopupDiv.id="altwatch-link-popup-" + createUUID();  // appended UUID for unique ref below
    altwatchLinkPopupDiv.innerHTML =
        "<div class='AltLinkStack'>" +
        // link items will be added here by service worker callback in loadAlternativeVideoLinks function
        "</div>"

    altwatchDiv.appendChild(altwatchLinkPopupDiv);

    // This initializes the new div as a hidden, popup ready, jquery dialog
    $( altwatchLinkPopupDiv ).dialog({
        autoOpen: false,
        modal: true,
        dialogClass: 'AltWatchPopupDialog',
        collision: "none",
        width: 200,
        height: 175,
    });

    // Attach an onClick handler function to the altwatch button (a/img), which will position
    // and pop up a JQuery dialog containing links to like videos on other platforms.
    $( altwatchButtonLink ).on( "click", function(event) {
        // Get a JQuery object reference to the dialog popup div element
        // See: https://api.jqueryui.com/dialog/#method-option
        var dialogRef = $( "#" + altwatchLinkPopupDiv.id );
        // Set the position attribute of the dialog wrapper element relative to the a/img element that was clicked
        // left bottom of dialog aligned with left bottom of a/img "button" should cover the button and pop up above/right
        // See: https://api.jqueryui.com/position/
        dialogRef.dialog("option", "position", {
                my: 'left bottom',
                at: 'top right',
                of: event.target
            });
        dialogRef.dialog("open");
        // Note: This is deferred until the popup is actually shown, to avoid a flood of background
        //  requests to load search results that will likely never be used.
        loadAlternativeVideoLinks(altwatchLinkPopupDiv.id, videoTitle, "TODO:findCreatorFromPage");
        // The dialog content will be empty / blank until the callback function is invoked to
        // substitute the response (links, if found)
        // TODO: Maybe put generic search links in the dialog for the impatient to click and
        //  navigate immediately with the video title and creator filled in as search args.
    });


}

/*
 * Send message to the background script listener (service worker) to search for alternative platform
 * video links asynchronously, and then call back here to fill in the popup div contents.
 */
function loadAlternativeVideoLinks(targetDivId, videoTitle, creatorName) {
    console.log("Sending message to service worker for: " + targetDivId +
        ",'" + videoTitle + "', '" + creatorName + "'");
    chrome.runtime.sendMessage({
        targetDivId: targetDivId,
        videoTitle: videoTitle,
        creatorName: creatorName
    }, function(response) {
        console.log("Receiving links from service worker for popup div: " + targetDivId);
        const targetDivSelector = "#" + targetDivId;
        console.log("Selector: " + targetDivSelector);
        const targetDiv = $(targetDivSelector);
        console.log("Div: " + targetDiv);
        const flexColumnDiv = $(targetDivSelector + " > div");
        console.log("flexColumnDiv: " + flexColumnDiv);
        for (alternativeVideoLink of response.alternativeVideoLinks) {
            console.log(response.targetDivId + " --> " + alternativeVideoLink.targetUrl);
            // ENHANCE: Maybe have the plugin supply the url for the graphic directly in the alternateVideoLink result object
            const linkAnchor = document.createElement("a");
            linkAnchor.href = alternativeVideoLink.targetUrl;
            linkAnchor.target = "_blank";
            linkAnchor.innerHTML = "<div class='AltWatchLink'><img src='" + image32Urls[alternativeVideoLink.platform] + "' id='altwatchTarget' />View on " +
                alternativeVideoLink.platform + "</div>";
            // Put the video link in the flex-column div
            flexColumnDiv.append(linkAnchor);
        }
    });
}

function handleVideoDetailsDivs(videoDetailsDivs) {
    // `document.querySelector` may return null if the selector doesn't match anything.
    let modifiedCount = 0;
    videoDetailsDivs.forEach((videoDetailsDiv) => {
        // Check to see if the avatar-link has been populated yet.
        var avatarLink = videoDetailsDiv.querySelector("a[id='avatar-link']");
        // Check to see if the altwatch div has already been added
        var existingAltwatchDiv = videoDetailsDiv.querySelector("div#altwatch");
        // Add the AltwatchDiv after the avatar-link has shown up, and only once
        if (avatarLink && !existingAltwatchDiv) {
            // console.log("DEBUG when false existingAltwatchDiv is: " + existingAltwatchDiv);
            addAltwatchDiv(videoDetailsDiv, avatarLink);
            modifiedCount++;
        // } else {
            //console.log("when true existingAltwatchDiv is: " + existingAltwatchDiv);
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



