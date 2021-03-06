# Fit Report

<img src="https://dl.dropboxusercontent.com/u/366007/fit%20report/Icon-120%402x.png" width="120">

Fit Report is a personal fitness visualization that uses the output from [Reporter for iPhone][reporter-app] to map your workout and nutrition activity to how you feel.

<img src="https://dl.dropboxusercontent.com/u/366007/fit%20report/screenshot.png" alt="fit-report" width="872">

`worked out`, `ate well` and `mood` are qualitative metrics which you should redefine as you improve. A 5k run might be the workout of a lifetime for one person and a warm up for someone more experienced. Over time, as you get fitter you'll naturally intensify your workouts and improve your nutritional standards.

## Why

I think there's a place for something between the worlds of passive wearable tech and hyper-accurate detailed manual tracking.

## How it works

### Basically
Reporter app → dropbox sync → recurring shell script processes JSON and uploads to server → Fit Report webapp parses it and renders the visualization.

### The long version

The data for the fit-report comes from [Reporter][reporter-app] for iPhone. I choose to use Reporter because it's the nicest, quickest way to answer simple questions on my phone and get JSON back ([daily reports][reporter-files] are exported to dropbox). The questions are set up like so:

<img src="https://dl.dropboxusercontent.com/u/366007/fit%20report/reporter-questions.png" alt="reporter app" width="320">

On my mac, I have `report.sh` set to run as a [launch daemon][apple-launchd] every night ([launchd guide][guide]).

> `report.sh` requires [jq][jq]. Run `$ brew install jq`

When run, `report.sh` combines the reporter JSON files into a single file and moves the upload to the `/public` dropbox folder where it can be retrieved remoted.

On the remote static server, `parser.js` then parses the processed Reporter JSON and uses Mustache js to render the fitness visualization.

:fireworks:

[blog-post]:http://pketh.github.io
[reporter-app]:http://www.reporter-app.com
[reporter-files]:https://gist.github.com/dbreunig/9315705
[apple-launchd]:https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html
[guide]:http://nathangrigg.net/2012/07/schedule-jobs-using-launchd/
[jq]: http://stedolan.github.io/jq
