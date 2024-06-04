import { Handler } from "aws-lambda";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    QueryCommand,
    QueryCommandOutput
} from "@aws-sdk/lib-dynamodb";
export const handler: Handler =  async function(event, context, callback) {
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const tableName = event['TABLE_NAME'];

    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    let statusCode = 200;

    const params = {
        TableName: tableName,
        IndexName: "_id",
        KeyConditionExpression: "#flightDate > :flightDate",
        ExpressionAttributeNames: {
            "#flightDate": "flightDate",
        },
        ExpressionAttributeValues: {
            ":flightDate": lastWeekDate,
        },
    };

    try {
        let body: QueryCommandOutput = await docClient.send(new QueryCommand(params));
        body = body.Items;
        console.log('result : ' + JSON.stringify(body));
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: body,
            }),
        };
    } catch (error) {
        console.error("Error:", error);
    }
};