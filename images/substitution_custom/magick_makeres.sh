#!/bin/sh

# To modify the icons for the extension...
# First edit the xcf file in Gimp and export a png at 128x128
# Then run this script to produce 48x48, 32x32, and 16x16 versions.

magick icon-128.png -strip -resize 48x48 icon-48.png
magick icon-128.png -strip -resize 32x22 icon-32.png
magick icon-128.png -strip -resize 16x16 icon-16.png
