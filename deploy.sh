#!/bin/bash

echo ==================
echo Minify css
echo ==================
juicer merge -i --force -o static/css/min.css static/css/master.css

echo ==================
echo Building site
echo ==================
jekyll

echo =========================
echo GZIP All Html, css and js
echo =========================

find _site/ -iname '*.html' -exec gzip -n {} +
find _site/ -iname '*.js' -exec gzip -n {} +
find _site/ -iname '*.css' -exec gzip -n {} +
find _site/ -iname '*.gz' -exec rename 's/\.gz$//i' {} +
echo done.

echo ==================
echo Syncing to S3
echo ==================

s3cmd sync --progress -M --acl-public --add-header 'Content-Encoding:gzip' _site/ s3://fusion.dominicwatson.co.uk/ --exclude '*.*' --include '*.html'
s3cmd sync --progress -M --acl-public _site/ s3://fusion.dominicwatson.co.uk/ --exclude '*.sh' --exclude 'static/*' --exclude '*.html' --exclude 'atom.xml'
s3cmd sync --progress -m application/atom+xml --acl-public _site/ s3://fusion.dominicwatson.co.uk/ --exclude '*.*' --include 'atom.xml'
s3cmd sync --progress -M --acl-public --add-header 'Content-Encoding:gzip' --add-header 'Cache-Control: max-age=31449600' _site/static/ s3://css.dominicwatson.co.uk/frankfusion/ --exclude '*.*' --include '*.js' --include '*.css'
s3cmd sync --progress -M --acl-public --add-header 'Cache-Control: max-age=31449600' _site/static/ s3://css.dominicwatson.co.uk/frankfusion/ --exclude '*.css' --exclude '*.js'

exit 0
