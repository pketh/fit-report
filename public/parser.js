console.log('( ﾟ▽ﾟ)/');

moment.lang('en');

var input = 'https://dl.dropboxusercontent.com/u/366007/fit-report.json'
// var input = 'fit-report.json'

$.getJSON(input, function(json) {
	var responses,
		workoutStreak = 0,
		ateWellStreak = 0,
		workoutStreakInitial, //
		ateWellStreakInitial, //
		streak,
		date,
		day,
		month,
		monthName,
		reportDate,
		workedOut,
		ateWell,
		goodMood,
		moodEmote,
		note,
		reportObj,
		reportHTML,
		template,
		streakHTML,
		streakObj,
		streakTemplate,
		todayObj,
		goodbyeHTML,
		byeTemplate;

	// show last 30 responses max
	if (json.length > 30) {
		responses = 30;
	} else {
		responses = json.length
	}
	console.log('showing ' + responses + ' of ' + json.length);
	for (var i = 0; i < responses; i++) {

		// date
		date = json[i].date;
		day = moment(date).date();
		month = moment(date).months();
		monthName = moment.monthsShort(month);
		reportDate = monthName + ' ' + day

		// worked out?
		workedOut = json[i].responses[0].answeredOptions;
		if (workedOut == 'Yes') {
			workoutStreak++;
		} else if (workedOut == 'No' && typeof workoutStreakInitial === 'undefined') {
			console.log('&& hello')
			workoutStreakInitial = workoutStreak;
			workoutStreak = 0;
		} else {
			workoutStreak = 0;
		}

		// ate well?
		ateWell = json[i].responses[1].answeredOptions;
		if (ateWell == 'Yes') {
			ateWellStreak++;
		} else if (ateWell == 'No' && typeof ateWellStreakInitial === 'undefined') {
			ateWellStreakInitial = ateWellStreak;
			ateWellStreak = 0;
		} else {
			ateWellStreak = 0;
		}

		// good mood?
		goodMood = json[i].responses[2].answeredOptions;
		if (goodMood == 'Yes') {
			moodEmote = '( ﾟ▽ﾟ)/'
		} else {
			moodEmote = '(╯︵╰,)'
		}

		// note string
		note = json[i].responses[3].textResponse;

		// mustache object
		reportObj = {
			'reportDate': reportDate,
			'workedOut': workedOut[0].toLowerCase(),
			'ateWell': ateWell[0].toLowerCase(),
			'goodMood': goodMood[0].toLowerCase(),
			'moodEmote': moodEmote,
			'note': note
		}

		// render the template into dom
		reportHTML = $('#report').html()
		template = Mustache.render(reportHTML, reportObj);

		$('.reports').append(template);

	}

	if (workoutStreakInitial < ateWellStreakInitial) {
		streak = workoutStreakInitial;
	} else {
		streak = ateWellStreakInitial;
	}
	console.log('total streak is ' + streak + ' days');
	streakObj = {
		'streak': streak
	}
	streakHTML = $('#streak').html();
	streakTemplate =Mustache.render(streakHTML, streakObj);
	$('.streak').append(streakTemplate)

	// render footer goodbye
	todayObj = {
		'day': moment().format('dddd')
	}
	goodbyeHTML = $('#goodbye').html();
	byeTemplate = Mustache.render(goodbyeHTML, todayObj)
	$('footer').append(byeTemplate);

});
