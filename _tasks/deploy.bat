@echo off
set curr_dir=%cd%
chdir %curr_dir%/../
call jekyll build
call s3_website push
chdir %curr_dir%
pause