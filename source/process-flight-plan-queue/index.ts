import { Handler } from "aws-lambda";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    PutCommandOutput,
    PutCommandInput
} from "@aws-sdk/lib-dynamodb";
export const handler: Handler =  async function(event, context, callback) {
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const tableName = event['TABLE_NAME'];

    const params: PutCommandInput = {
        TableName: tableName,
        Item: {
            _id: event['_id'],
            airline: event['airline'],
            flightNumber: event['flightNumber'],
            flightDate: event['flightDate'],
            message: event['message'],
            version: event['version']
        },
    };

    try {
        let response: PutCommandOutput = await docClient.send(new PutCommand(params));
        console.log('result : ' + JSON.stringify(response));
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: response,
            }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Invalid request',
            }),
        };
    }
};