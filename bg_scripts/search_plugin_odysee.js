// Registers a search plugin function for Odysee

// Add a function to the searchPlugins collection.  Iterated later using object::keys()
searchPlugins.odysee = {
    "defaultUrl": "https://odysee.com/$/search",
    "search": function(videoTitle, creatorName) {
        // const odyseeResponse = await fetch('http://odysee.com/$/search?q=' + encodeURIComponent(videoTitle));
        // TODO: actually send the search request and parse the response
        return this.defaultUrl + "?q=" + encodeURIComponent(videoTitle);
    }
}