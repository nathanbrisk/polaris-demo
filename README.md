This solution is based on [aws-serverless-batch-architecture](https://github.com/aws-samples/aws-serverless-batch-architecture)

# This application is a work-in-progress

## What I was going for

I was going to use AWS Step functions to break up a large CSV file of flight data, validate those file chunks, post flight plan entries to SQS, a Lambda function would then post the queue into DynamoDB, the user would be emailed when the job was completed, and the flight plans could be pulled later with caching.

But it doesn't work. I ran into many issues with AWS SAM. I did build out a few Lambda functions (authorizer, Get Flight Plans, Post to SQS, Process Flight Plan Queue), but I was still in the debugging stage, and they are not in working order yet.

Caveats:

- several of the Lambda functions are still written in Python. I didn't finish converting them over into Typescript

What's missing: 

- The SAM template doesn't successfully generate the API Gateway due to dependent Lambdas not being pushed first
- /post-flight-plans endpoint hasn't been built
- Caching needs to be added to /get-flight-plans
- Email notification needs to be updated to include log errors