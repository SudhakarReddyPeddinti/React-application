from __future__ import print_function

import json
import urllib
import boto3

print('Loading function')

s3 = boto3.client('s3')


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    #bucket = event['Records'][0]['s3']['bucket']['name']
    bucket = "vindatabucket"
    #key = urllib.unquote_plus(event['Records'][0]['s3']['object']['key'].encode('utf8'))
    key = "Output/TestingJson/Output.json"
    #key = "S3Testing.json"
    
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        content = response['Body'].read()
        print(content)
        print("--------------")
        #print(json_obj)
        for obj in content:
            print(obj)
        #output_obj = [x for x in content if x['Dealer'] == '4519']
        print("Data filtered")
        #print(output_obj)
        #return response
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
