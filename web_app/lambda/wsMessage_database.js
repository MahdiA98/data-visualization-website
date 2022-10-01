
let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getFootballData = async(teamName) => {
    let params = {
        TableName: "FootballData",
        FilterExpression: 'team = :tm',
        ExpressionAttributeValues: {
            ':tm': teamName
            }
    };
    return documentClient.scan(params).promise();
}

module.exports.getSentimentData = async(teamName) => {
    let params = {
        TableName: "SentimentData",
        FilterExpression: 'category = :tm',
        ExpressionAttributeValues: {
            ':tm': teamName
            }
    };
    return documentClient.scan(params).promise();
}

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "WebSocketClients"
    };
    return documentClient.scan(params).promise();
};

//Deletes the specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "WebSocketClients",
        Key: {
            ConnectionId: connectionId
        }
    };
    return documentClient.delete(params).promise();
};
