//Module that reads keys from .env file
const dotenv = require('dotenv');

//Node Twitter library
const Twitter = require('twitter');

//Moments library
const moment = require('moment');

//Imports
import { String } from "aws-sdk/clients/acm";
import { unix } from "moment";
import { saveTwitterData } from "./../db/database_function";

//Copy variables in file into environment variables
dotenv.config();

//Set up the Twitter client with the credentials
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//Function downloads and outputs tweet text
async function storeTweets(keyword: string){
    try{
        //Set up parameters for the search
        let searchParams = {
            q: keyword,
            count: 100,
            lang: "en"
        };

        //Wait for search to execute asynchronously
        let twitterResult = await client.get('search/tweets', searchParams);

        //Output the result
        let promiseArray: Array< Promise<string> > = [];

        twitterResult.statuses.forEach((tweet)=>{
            var unixTimestamp = moment(convertDate(tweet.user.created_at), 'YYYY.MM.DD').unix();
            //Store save data promise in array
            promiseArray.push(saveTwitterData(tweet.id, tweet.text, unixTimestamp, keyword));
        });

        //Execute all of the save data promises
        let databaseResult: Array<string> = await Promise.all(promiseArray);
        //console.log("Database result: " + JSON.stringify(databaseResult));
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
};

//Converts twitter date to suitable format
function convertDate(date: string): String {
    var year = date.slice(-4);
    var month = convertDateHelper(date.substring(4, 7));
    var day = date.substring(8, 10);
    var newDate = year + "." + month + "." + day;
    return newDate;
}

//Helper function for convertDate
function convertDateHelper(month: string): string {
    var months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var months2: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    for (var i = 0; i < months.length; i++) {
        if (month == months[i]) {
            return months2[i];
        }
    }
}

//Call functions to search for tweets with different teams
//storeTweets("Manchester United");
//storeTweets("Chelsea");
//storeTweets("Arsenal");
//storeTweets("Liverpool");
//storeTweets("Liverpool");

