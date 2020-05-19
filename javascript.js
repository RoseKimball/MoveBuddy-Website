
var resultOptions = [{
        title: 'Here is your personalized packing list!',
    },
    {
        title: 'Here is your personalized packing list!',
    },
    {
        title: 'Here is your personalized packing list!',
    },
    {
        title: 'Here is your personalized packing list!',
    },
    {
        title: 'Here is your personalized packing list!',
    },
];


// variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;




quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.find('.quiz-answer');

    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);

        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                answerScore = parseInt(value);
            console.log('the answer is: ', answerScore)
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = wasActive.attr('data-quizIndex'),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                totalScore -= oldScoreValue;
                totalScore += answerScore;
                calcResults(totalScore);

                console.log(data - quizIndex);

            } else {
                //visual active state
                $this.addClass('active');
                // score calculation
                totalScore += answerScore;
                calcResults(totalScore);
                // current step
                updateStep(currentStep);
            }
        }
    });
});


// show current step/hide other steps
function updateStep(currentStep) {
    if (currentStep.hasClass('current')) {
        currentStep.removeClass('current');
        currentStep.next().addClass('current');
    }
}

// display scoring results
function calcResults(totalScore) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length) {
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');

        // calc lowest possible score
        var lowestScoreArray = $('#quizzie .low-value').map(function () {
            return $(this).attr('data-quizIndex');
        });

        var minScore = 0;
        for (var i = 0; i < lowestScoreArray.length; i++) {
            minScore += lowestScoreArray[i] << 0;
        }
        // calculate highest possible score
        var highestScoreArray = $('#quizzie .high-value').map(function () {
            return $(this).attr('data-quizIndex');
        });
        var maxScore = 0;
        for (var i = 0; i < highestScoreArray.length; i++) {
            maxScore += highestScoreArray[i] << 0;
        }
        // calc range, number of possible results, and intervals between results
        var range = maxScore - minScore,
            numResults = resultOptions.length,
            interval = range / (numResults - 1),
            increment = '',
            n = 0; //increment index
        while (n < numResults) {
            increment = minScore + (interval * n);
            if (totalScore <= increment) {
                // populate results
                $('#results').show();
                resultsTitle.replaceWith("<h1>" + resultOptions[n].title + "</h1>");
                resultsDesc.replaceWith("<p class='desc'>" + resultOptions[n].desc + "</p>");
                return;
            } else {
                n++;
            }
        }
    }
}