let AWS = require("aws-sdk");

//Create instance of Comprehend
let comprehend = new AWS.Comprehend();

//Function that will be called
exports.handler = async (event) => {
    try {
        
        for (let record of event.Records) {
            if(record.eventName == "INSERT") {
                let id = record.dynamodb.NewImage.id.N;
                let text = record.dynamodb.NewImage.text.S;
                let timestamp = record.dynamodb.NewImage.timestamp.N;
                let category = record.dynamodb.NewImage.category.S;
                console.log("ID: " + id + ", Text: " + text + ", Timestamp: " + timestamp + ", Category: " + category);
                
                let params = {
                    LanguageCode: "en",
                    Text: text
                };
                
                let result = await comprehend.detectSentiment(params).promise();
                
                let documentClient = new AWS.DynamoDB.DocumentClient();
                
                let params2 = {
                    TableName: "SentimentData",
                    Item: {
                        id: parseInt(id),
                        tweetTS: parseInt(timestamp),
                        category: category,
                        sentiment: result,
                    }
                };
                await documentClient.put(params2).promise();
                console.log("Added to database.")
                console.log(result);
                }
            }
        }
        catch(err) {
            console.log(err);
    }
}
