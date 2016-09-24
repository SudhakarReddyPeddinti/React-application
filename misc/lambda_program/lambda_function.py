from __future__ import print_function

import boto3
import cStringIO

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket = "vindatabucket"
    try:
        response = s3.list_objects_v2(Bucket=bucket, Prefix='SingleFileStructure/DealerAverages/part')
        for resp_contents in response['Contents']:
            obj = s3.get_object(Bucket=bucket, Key=resp_contents['Key'])
            content = obj['Body'].read()
            scsv = cStringIO.StringIO(content)
            for row in scsv:
                if '"Dealer":5836' in row:
                    return row
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
