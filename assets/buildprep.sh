#!/bin/sh

# Execute this within the assets directory.

if [ ! -f jquery_3_6_1.min.js ]; then
    echo "Downloading jquery..."
    wget -O jquery_3_6_1.min.js https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js
fi

if [ ! -f jquery-ui-1.13.2.zip ]; then
    echo "Downloading jquery-ui"
    wget https://jqueryui.com/resources/download/jquery-ui-1.13.2.zip
    unzip -j jquery-ui-1.13.2.zip */jquery-ui.min.js
    unzip -j jquery-ui-1.13.2.zip */jquery-ui.min.css
    mv jquery-ui.min.js jquery-ui_1_13_2.min.js
fi
