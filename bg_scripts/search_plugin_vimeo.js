// Registers a search plugin function for Vimeo

// Add a function to the searchPlugins collection.  Iterated later using object::keys()
searchPlugins.vimeo = {
    "defaultUrl": "http://vimeo.com/search",
    "search": function(videoTitle, creatorName) {
        // const vimeoResponse = await fetch('http://vimeo.com/search?t=' + encodeURIComponent(request.videoTitle));
        // TODO: actually send the search request and parse the response
        return this.defaultUrl + "?q=" + encodeURIComponent(videoTitle);
    }
}