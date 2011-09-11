#!/bin/bash

echo ==================
echo Minify css
echo ==================
juicer merge -i --force -o static/css/min.css static/css/master.css

echo ==================
echo Start jekyll server
echo ==================
jekyll --server

exit 0