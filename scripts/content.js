const thumbnails = document.querySelectorAll("a[id='video-title-link']");

// `document.querySelector` may return null if the selector doesn't match anything.
selectedThumbnails = "";
thumbnails.forEach((thumbnail) => {
    selectedThumbnails = selectedThumbnails + thumbnail.textContent;
//    if (thumbnail) {
        // const text = article.textContent;
        // const wordMatchRegExp = /[^\s]+/g; // Regular expression
        // const words = text.matchAll(wordMatchRegExp);
        // matchAll returns an iterator, convert to array to get word count
        // const wordCount = [...words].length;
        // const readingTime = Math.round(wordCount / 200);
        // const badge = document.createElement("p");
        // Use the same styling as the publish information in an article's header
        // badge.classList.add("color-secondary-text", "type--caption");
        // badge.textContent = `⏱️ ${readingTime} min read`;

        // Support for API reference docs
        // const heading = article.querySelector("h1");
        // Support for article docs with date
        // const date = article.querySelector("time")?.parentNode;
        //
        // (date ?? heading).insertAdjacentElement("afterend", badge);
//    }
});
alert(selectedThumbnails);