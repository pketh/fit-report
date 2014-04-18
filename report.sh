#!/bin/sh

# test run with $ ~/Dropbox/projects/fit-report/report.sh
## or wherever you put this file

# Location of Reporter-App sync folder
REPORTER_FOLDER=~/Dropbox/Apps/Reporter-App/

# Location of project repo
PROJECT=~/Dropbox/projects/fit-report/

# File with FTP info
CREDENTIALS_FILE="credentials.sh"
source $PROJECT$CREDENTIALS_FILE

#
# ＝( ^o^)ノ ．．．…___ｏ
#

cd $REPORTER_FOLDER
rm fit-report.json

# get number of json files in folder, excluding 'fit-report.json'
number_reports=$(ls -l | wc -l)
echo "number of reports: $number_reports"

oldest_report=$(ls -t | grep -v 'fit-report.json' | tail -n1)
echo "oldest report is: $oldest_report"

#start json objects array
echo '[' >> fit-report.json

echo ""

# evaluate each iOS reporter-app report file ↴
for (( i=2; i<=$number_reports; i++ ))
do
	echo "⚡︎ Parent iteration is: $i"

	# set current file to evaluate in this for loop
	current_file=$(ls -t | head -n $i | sed -n $i'p')
	echo "current file is: $current_file"

	# get number of snapshots in the current file
	current_file_snapshots=$(cat $current_file | jq '.snapshots | length')
	echo "number of snapshots in current file is: $current_file_snapshots"

	# parse each snapshot individually in the current file
	for (( ii=0; ii<$current_file_snapshots; ii++ ))
	do
		echo "✈︎ nested for loop at iteration $ii"

		# don't append a ',' to the oldest snapshot in the last file.
		if [ $current_file == $oldest_report ] && [ $ii == $((current_file_snapshots - 1 )) ]
			then
				echo "✿ this is the last snapshot"
				cat $current_file | jq ".snapshots[$ii] | {date, responses}" >> fit-report.json
			else
				cat $current_file | jq ".snapshots[$ii] | {date, responses}" >> fit-report.json
				echo ',' >> fit-report.json
		fi
		echo "----"
	done

done

# end the json array
echo ']' >> fit-report.json


# upload fit-report.json to server ↴
curl -T fit-report.json ftp://$FTP_USER:$FTP_PASS@$FTP_ADDRESS{}

# echo on complete
echo '♥︎︎ fit-report updated'
