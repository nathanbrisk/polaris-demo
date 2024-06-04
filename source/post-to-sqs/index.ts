import { Handler } from "aws-lambda";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

export const handler: Handler =  async function(event, context, callback) {
    const client = new SQSClient({ region: "eu-north-1" });
    const SQS_QUEUE_URL = event['SqsQueueArn'];

    const command = new SendMessageCommand({
        QueueUrl: SQS_QUEUE_URL,
        DelaySeconds: 10,
        MessageBody:
            event['MessageDetails']['validatedResult'],
    });

    const response = await client.send(command);
    console.log(response);
    return response;
};