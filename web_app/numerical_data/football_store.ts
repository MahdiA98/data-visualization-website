//importing database functions
import { saveData } from './../db/database_function';

//library imports
const dotenv = require('dotenv');
var axios = require('axios');
dotenv.config();

//base url
var baseURL: string = 'https://v3.football.api-sports.io/';

//setting axios parameters
const axiosInstance = axios.create({
    headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io/'
    }
});

//variables to hold data
var id: number;
var team: string;
var ftScore: string;
var htScore: string;
var targetFtScore: number;
var oppositionFtScore: number;
var targetHtScore: number;
var oppositionHtScore: number;

//array containing leagues and teams
const teams = [{ id: '50' }, { id: '49' }, { id: '40' }, { id: '42' }, { id: '33' }];

const leagues = [{ id: '2010' }, { id: '2011' }, { id: '2012' }, { id: '2013' }, { id: '2014' }, { id: '2015' },
                 { id: '2016' }, { id: '2017' }, { id: '2018' }, { id: '2019' }, { id: '2020' }, { id: '2021' }];

//empty arrays to hold data objects and promises
let data = [];
let promises = [];

//Cycles through arrays and adds to data array
for (var i = 0; i < teams.length; i++) {
    for (var j = 0; j < leagues.length; j++) {
        promises.push(
            axiosInstance.get('https://v3.football.api-sports.io/fixtures?league=39&season=' + leagues[j].id + '&team=' + teams[i].id).then(response => {
                data.push(response.data);
            })
        )
    }
}

Promise.all(promises).then(() => parseDataParent(data));

//helper function parent, performs parseData for each value in data array
function parseDataParent(data) {
    for (var i = 0; i < data.length; i++) {
        parseData(data[i]);
    }
}

//function that manipulates data and stores in appropriate variables
function parseData(responseData) {

    var results = responseData.response;
    var targetTeam: string = responseData.parameters.team;
    targetTeam = parseDataHelper(targetTeam);

    for (var i = 0; i < results.length; i++) {
        if (results[i].teams.home.name == targetTeam) {
            targetFtScore = results[i].goals.home;
            oppositionFtScore = results[i].goals.away;
            targetHtScore = results[i].score.halftime.home;
            oppositionHtScore = results[i].score.halftime.away;
        }
        else if (results[i].teams.away.name == targetTeam) {
            targetFtScore = results[i].goals.away;
            oppositionFtScore = results[i].goals.home;
            targetHtScore = results[i].score.halftime.away;
            oppositionHtScore = results[i].score.halftime.home;
        }
        if (results[i].goals.home == null || results[i].goals.away == null) {
            targetFtScore = 0;
            oppositionFtScore = 0;
        }
        if (results[i].score.halftime.home == null || results[i].score.halftime.away == null) {
            targetHtScore = 0;
            oppositionHtScore = 0;
        }
        id = results[i].fixture.id;
        htScore = targetHtScore.toString() + "-" + oppositionHtScore.toString();
        ftScore = targetFtScore.toString() + "-" + oppositionFtScore.toString();
        saveData(id, targetTeam, htScore, ftScore);
    }

    //helper function for parseData, returns team name
    function parseDataHelper(teamNumber: string) {

        if (teamNumber == '33') {
            teamNumber = "Manchester United";
        }
        else if (teamNumber == '49') {
            teamNumber = "Chelsea";
        }
        else if (teamNumber == '40') {
            teamNumber = "Liverpool";
        }
        else if (teamNumber == '42') {
            teamNumber = "Arsenal";
        }
        else if (teamNumber == '50') {
            teamNumber = "Manchester City";
        }
        return teamNumber;
    }
}

