const button32url = chrome.runtime.getURL("images/icon-32.png");
const vimeo32url = chrome.runtime.getURL("images/platform-vimeo-32.png");
const odysee32url = chrome.runtime.getURL("images/platform-odysee-32.png");
const rumble32url = chrome.runtime.getURL("images/platform-rumble-32.png");

function createUUID() {
    // See: https://www.arungudelli.com/tutorial/javascript/how-to-create-uuid-guid-in-javascript-with-examples/
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function addAltwatchDiv(videoDetailsDiv) {
    avatarLink = videoDetailsDiv.querySelector("a[id='avatar-link']");
    if (!avatarLink) {
        // TODO: Find out why this happens.  Is the content just not populated yet?  Is this normal?
        console.log("WARNING: Couldn't find avatar-link anchor within details div: " + videoDetailsDiv.id
        + " - a#avatar-link: " + avatarLink);
        return;
    }
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
    altwatchLinkPopupDiv.setAttribute("data-role", "popup");
    altwatchLinkPopupDiv.classList.add("ui-content")
    altwatchLinkPopupDiv.id="altwatch-link-popup-" + createUUID();  // appended UUID for unique ref below
    rumbleVideoId="12345";
    odyseeVideoId="5551212";
    vimeoVideoId="7ba98fe76c2b";
    // TODO: Style the list of target buttons better than this.
    altwatchLinkPopupDiv.innerHTML =
        "<a href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'" +
        ">Close</a>" +
        "<form style='display: flex; flex-direction: column; width: 100%; height: 95%;'>" +
        "<a href='https://rumble.com?v=" + rumbleVideoId + "'><span><input src='' id='altwatchTarget' /> View on Rumble</span></a>" +
        "<a href='https://odysee.com?id=" + odyseeVideoId + "'><span><image src='' id='altwatchTarget' /> View on Odysee</span></a>" +
        "<a href='https://vimeo.com?watch=" + vimeoVideoId + "'><span><image src='' id='altwatchTarget' /> View on Vimeo</span></a>" +
        "</form>"

    altwatchDiv.appendChild(altwatchLinkPopupDiv);

    altwatchButtonLink.href = "#" + altwatchLinkPopupDiv.id;

    // Use jquery to add an onClick handler function to the altwatch button, that
    // will pop up a dialog with the found links.
    // $( altwatchButtonLink ).css("background-color", "blue");  // tests to be sure selector is working
    // const opt = {
    //     autoOpen: false,
    //     modal: true,
    //     title: "alt-watch",
    //     width: 400,
    //     height: 400,
    //     show: { effect: "blind", duration: 1000 },
    //     hide: { effect: "explode", duration: 1000 }
    // }
    // TODO: find out why this handler doesn't get invoked, but the "click" is still passed back to the open-video handler instead
    // $( altwatchButtonLink ).on( "click", function() {
    //     $( "#" + altwatchLinkPopupDiv.id ).dialog(opt).dialog("open");
    // });

}

function handleVideoDetailsDivs(videoDetailsDivs) {
    // `document.querySelector` may return null if the selector doesn't match anything.
    let modifiedCount = 0;
    videoDetailsDivs.forEach((videoDetailsDiv) => {
        // Check to see if the altwatch div has already been added
        existingAltwatchDiv = videoDetailsDiv.querySelector("div#altwatch");
        if (!existingAltwatchDiv) {
            console.log("when false existingAltwatchDiv is: " + existingAltwatchDiv);
            addAltwatchDiv(videoDetailsDiv);
            modifiedCount++;
        } else {
            console.log("when true existingAltwatchDiv is: " + existingAltwatchDiv);
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



