# Fit Report

## what

reporter app -> to fitness optimized visualization. works for me ..

## why

## how

rubegoldergian:
from reporter app (show questions) -> dropbox sync -> merged json to publically accessible server -> app references it clientside

design details on blog:
qualitative, my standard for eating well is constantly tightening, making super long range, high number analysis less useful

edit
credentials and report sh vars

set up reporter app (sync w dropbox)

schedule it to running everyday at midnight:
watches folder for changes -> runs, and also runs each day at midnight or, if your mac is asleep at the time, when it wakes up.

- move ' com.pketh.fit-report.plist ' to ' ~/Library/LaunchAgents/ '

run the plist with
> launchctl load -w ~/Library/LaunchAgents/com.pketh.fit-report.plist

should now appear in the jobs list when you run
> launchctl list

http://nathangrigg.net/2012/07/schedule-jobs-using-launchd/

redacted:
add line to cron file:
55 23 * * * ~/Dropbox/projects/fit-report/report.sh
(if you want it to run every day at midnight)

dependency
http://stedolan.github.io/jq
brew install jq

> For readme: Screenshot, Rube Goldberg device, reporter app questions scren(purple)