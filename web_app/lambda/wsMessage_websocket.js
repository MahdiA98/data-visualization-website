
let AWS = require("aws-sdk");

//Import functions for database
let db = require('database');

module.exports.getSendMessagePromises = async (message, domainName, stage) => {
    
    let clientIdArray = (await db.getConnectionIds()).Items;
 
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        endpoint: domainName + '/' + stage
    });
    
    let dataObjArray = [];
    let dataObj = await db.getFootballData(message);
    let dataObj2 = await db.getSentimentData(message);
    
    dataObjArray.push(dataObj);
    dataObjArray.push(dataObj2);
    console.log(dataObjArray);
  
    //Try to send message to connected clients
    let msgPromiseArray = clientIdArray.map( async item => {
        try{
            
            let apiMsg = {
                ConnectionId: item.ConnectionId,
                Data: JSON.stringify(dataObjArray),
            };
            
            await apigwManagementApi.postToConnection(apiMsg).promise();
        }
        catch(err){
            console.log("Failed to send message to: " + item.ConnectionId);

            //Delete connection ID from database
            if(err.statusCode == 410) {
                try {
                    await db.deleteConnectionId(item.ConnectionId);
                }
                catch (err) {
                    console.log("ERROR deleting connectionId: " + JSON.stringify(err));
                    throw err;
                }
            }
            else{
                console.log("UNKNOWN ERROR: " + JSON.stringify(err));
                throw err;
            }
        }
    });

    return msgPromiseArray;
};