"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTwitterData = exports.saveData = void 0;
var AWS = require("aws-sdk");
//Configure AWS
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
//Create new DocumentClient
var documentClient = new AWS.DynamoDB.DocumentClient();
/* Function returns a Promise that will save the text with the specified id. */
function saveData(id, teamName, htScore, ftScore) {
    //Table name and data for table
    var params = {
        TableName: "FootballData",
        Item: {
            id: id,
            team: teamName,
            half_time_score: htScore,
            full_time_score: ftScore,
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + teamName);
            }
        });
    });
}
exports.saveData = saveData;
function saveTwitterData(tweetId, tweetText, tweetTimestamp, tweetCategory) {
    //Table name and data for table
    var params = {
        TableName: "TwitterData",
        Item: {
            id: tweetId,
            timestamp: tweetTimestamp,
            text: tweetText,
            category: tweetCategory
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + tweetId);
            }
        });
    });
}
exports.saveTwitterData = saveTwitterData;
//# sourceMappingURL=database_function.js.map