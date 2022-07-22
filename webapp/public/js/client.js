//Open connection
let connection = new WebSocket("wss://1hgtoqnk6j.execute-api.us-east-1.amazonaws.com/production");

//Log connected response
connection.onopen = function (event) { console.log("Connected: " + JSON.stringify(event)); };

//Log errors
connection.onerror = function (error) { console.log("WebSocket Error: " + JSON.stringify(error)); };


//Output messages from the server
connection.onmessage = function (msg) {

    let data = JSON.parse(msg.data);
    
    //retrieves numerical and sentiment data
    let numericalData = data[0].Items;
    let sentimentData = data[1].Items;

    //getting team name
    let teamName = data[0].Items[1].team;

    //getting sentiment anaylsis count to display to user
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;

    for (let i = 0; i < sentimentData.length; i++) {
        if (sentimentData[i].sentiment.Sentiment == "POSITIVE") {
            positiveCount += 1;
        }
        else if (sentimentData[i].sentiment.Sentiment == "NEUTRAL") {
            neutralCount += 1;
        }
        else if (sentimentData[i].sentiment.Sentiment == "NEGATIVE") {
            negativeCount += 1;
        }
    }

    //draws appropriate charts using passed in parameters
    drawPieChart(positiveCount, neutralCount, negativeCount, teamName);
    drawBarChart(numericalData, teamName);

    //setting default colour of gridlines
    Chart.defaults.global.defaultFontColor = "#000000";
}

//draws barchart to user
function drawBarChart(data, team) {

    let numericalData = data;

    //adds fulltime and halftime score to arrays 
    let arr = [];
    let arr2 = [];

    for (let i = 0; i < numericalData.length; i++) {
        arr.push(numericalData[i].full_time_score);
    }

    for (let i = 0; i < numericalData.length; i++) {
        arr2.push(numericalData[i].half_time_score);
    }
  
    //gets total number of occurences, and adds to occurences array with the score.
    var occurrences = [];
    var occurrences2 = [];

    for (var i = 0, j = arr.length; i < j; i++) {
        occurrences[arr[i]] = (occurrences[arr[i]] || 0) + 1;
    }

    for (var i = 0, j = arr2.length; i < j; i++) {
        occurrences2[arr2[i]] = (occurrences2[arr2[i]] || 0) + 1;
    }

    //sorts array by descending order
    let index = Object.keys(occurrences).sort(function (a, b) {
        return occurrences[b] - occurrences[a];
    });

    let sortedArr = index.map((v) => {
        return { key: v, value: occurrences[v] }
    });

    let index2 = Object.keys(occurrences2).sort(function (a, b) {
        return occurrences2[b] - occurrences2[a];
    });

    let sortedArr2 = index2.map((v) => {
        return { key: v, value: occurrences2[v] }
    });

    //setting x-axis values
    var xValues = [sortedArr[0].key, sortedArr[1].key, sortedArr[2].key, sortedArr[3].key, sortedArr[4].key,
    sortedArr[5].key, sortedArr[6].key, sortedArr[7].key, sortedArr[8].key];

    //setting y-axis values
    var yValues = [sortedArr[0].value + 10, sortedArr[1].value, sortedArr[2].value, sortedArr[3].value, sortedArr[4].value,
    sortedArr[5].value, sortedArr[6].value, sortedArr[7].value, sortedArr[8].value, sortedArr[9].value, 0];

    //adding halftime scores to x-axis values, next to fulltime score
    let halfTimeScores = [];

    for (let i = 0; i < xValues.length; i++) {
        for (let j = 0; j < sortedArr2.length; j++) {
            if (xValues[i] == sortedArr2[j].key) {
                halfTimeScores.push(sortedArr2[j].value);
            }
        }
    }
 
    //draws bar chart using set parameters
    new Chart("barChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Full time score",
                backgroundColor: "blue",
                data: yValues,
            }, {
                label: "Half time score",
                backgroundColor: "red",
                data: halfTimeScores,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Frequency of games'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Scores'
                    }
                }]
            },
            legend: { display: true },
            title: {
                display: true,
                text: "Numerical Data for " + team
            }
        }
    });
}

//sets and draws pie chart using method parameters, passed in.
function drawPieChart(positive, neutral, negative, team) {

    var xValues = ["Positive", "Neutral", "Negative"];
    var yValues = [positive, neutral, negative];
    var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
    ];

    new Chart("pieChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            responsive: false, // remove if uneeded
            title: {
                display: true,
                text: "Sentiment Data for " + team
            }
        }
    });
}

//Send request to server
function sendRequest(buttonValue) {
    //Get text from button
    let msgText = buttonValue;

    //Create message to be sent to server
    let msgObject = {
        action: "message",//Used for routing in API Gateway
        data: msgText
    };
    //Send request
    connection.send(JSON.stringify(msgObject));
}