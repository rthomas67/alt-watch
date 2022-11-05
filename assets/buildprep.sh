#!/bin/sh

# Execute this within the assets directory.
JQUERY_UI_VER="1.13.2"
JQUERY_UI_VER_FN="$( echo -e "$JQUERY_UI_VER" | tr  '.' '_'  )"
echo "VER: $JQUERY_UI_VER -- FN: '$JQUERY_UI_VER_FN'"

if [ ! -f jquery_3_6_1.min.js ]; then
    echo "Downloading jquery..."
    wget -O jquery_3_6_1.min.js https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js
fi

if [ ! -f jquery-ui-${JQUERY_UI_VER}.zip ]; then
    echo "Downloading jquery-ui"
    wget https://jqueryui.com/resources/download/jquery-ui-${JQUERY_UI_VER}.zip
    unzip -j jquery-ui-${JQUERY_UI_VER}.zip */jquery-ui.min.js
    mv jquery-ui.min.js jquery-ui_${JQUERY_UI_VER_FN}.min.js
    unzip -o -j jquery-ui-${JQUERY_UI_VER}.zip */jquery*.min.css
    mv jquery-ui.min.css jquery-ui_${JQUERY_UI_VER_FN}.min.css
    mv jquery-ui.structure.min.css jquery-ui_${JQUERY_UI_VER_FN}.structure.min.css
    mv jquery-ui.theme.min.css jquery-ui_${JQUERY_UI_VER_FN}.theme.min.css
    unzip -j -d jquery-ui_${JQUERY_UI_VER_FN}-images jquery-ui-${JQUERY_UI_VER}.zip *.png
    # adjust image URL references in the css files to map into the chrome extension files
    # See: https://stackoverflow.com/questions/3559781/google-chrome-extensions-cant-load-local-images-with-css/32130426#32130426
    sed -i "s%images/ui-icons_%chrome-extension://__MSG_@@extension_id__/assets/jquery-ui_1_13_2-images/ui-icons_%g" jquery-ui_${JQUERY_UI_VER_FN}.min.css
    sed -i "s%images/ui-icons_%chrome-extension://__MSG_@@extension_id__/assets/jquery-ui_1_13_2-images/ui-icons_%g" jquery-ui_${JQUERY_UI_VER_FN}.theme.min.css
fi
