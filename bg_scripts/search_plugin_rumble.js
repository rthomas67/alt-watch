// Registers a search plugin function for Rumble

// Add a function to the searchPlugins collection.  Iterated later using object::keys()
searchPlugins.rumble = {
    "defaultUrl": "https://rumble.com/search",
    "search": function(videoTitle, creatorName) {
        // const rumbleResponse = await fetch('http://rumble.com/search?t=' + encodeURIComponent(request.videoTitle));
        // TODO: actually send the search request and parse the response
        return this.defaultUrl + "?q=" + encodeURIComponent(videoTitle);
    }
}