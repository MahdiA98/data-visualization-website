let AWS = require("aws-sdk");

//Configure AWS
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//exported function that saves football data to appropriate dynamoDB table
export function saveData(id: number, teamName: string, htScore: string, ftScore: string): Promise<string> {
    //Table name and data for table
    let params = {
        TableName: "FootballData",
        Item: {
            id: id,
            team: teamName,
            half_time_score: htScore,
            full_time_score: ftScore,
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string> ((resolve, reject) =>{
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " +  JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + teamName);
            }
        })
    });
}

//exported function that saves twitter data to appropriate dynamoDB table
export function saveTwitterData(tweetId: number, tweetText: string, tweetTimestamp: number, tweetCategory: string): Promise<string> {
    //Table name and data for table
    let params = {
        TableName: "TwitterData",
        Item: {
            id: tweetId,
            timestamp: tweetTimestamp,
            text: tweetText,
            category: tweetCategory
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string> ((resolve, reject) =>{
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " +  JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + tweetId);
            }
        })
    });
}


