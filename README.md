# Summary
Source for a chrome browser extension that modifies video thumbnails
on YouTube, adding a small button that pops up a list of links to
other video platforms that appear to have the same content, by title
and similar creator/publisher name.

# Supported Platforms
* Rumble
* Odysee (Login Required?)
* Daily Motion
* Vimeo
* Vevo (maybe - mostly music vids??)
* Bitchute (maybe)
* Twitter Video
* IG TV
* DTube (maybe)
* Locals (paid - optional toggle on)

# Dev References
* Manifest v3 Mappings to Older Examples
  * https://developer.chrome.com/docs/extensions/mv3/mv3-migration/
* Using JQuery in a Chrome Extension
  * Note: This needs to be downloaded as part of the "build" process 
    and embedded in the extension's bundled assets.  See assets/buildprep.sh
  * https://en.wikipedia.org/wiki/JQuery
    * Current version as of 11/2022 == 3.6.1
      * https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js
    * License: https://jquery.org/license/
  * https://stackoverflow.com/questions/21317476/how-to-use-jquery-in-chrome-extension
    * Note: Suggestions about adding content_security_policy in this post are
      not compatible with Manifest v3 CSP Rules

