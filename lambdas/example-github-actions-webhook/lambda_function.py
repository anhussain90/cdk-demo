import json
import os
import requests

def handler(event=None, context=None):

    stage = event['requestContext']['stage']
    githubAPIURL = 'https://api.github.com/repos/org/repodispatches'
    requestHeaders = { 'Authorization': 'token ' + os.environ['GITHUB_TOKEN'],
                'Accept': 'application/vnd.github.everest-preview+json',
                }
    responseHeaders = {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Content-Type': 'application/json'
                }
    if stage in ['dev', 'acc', 'prod']:
        eventType = stage + '-blog-example-webhook'
        data = { 'event_type': eventType}
        response = requests.post(githubAPIURL,
                                 data=json.dumps(data),
                                 headers=requestHeaders
                 )
        if response.ok:
            return {
                'statusCode': "200", # 200 is returned instead of 204
                # 'headers': responseHeaders,
                'body': json.dumps('Triggered github actions for trigger ' + eventType),
                # 'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': response.status_code,
                # 'headers': responseHeaders,
                'body': json.dumps(response.text),
                # 'isBase64Encoded': False
            }
    else:
        return {
            'statusCode': '400',
            # 'headers': responseHeaders,
            'body': json.dumps('Bad Request'),
            # 'isBase64Encoded': False
        }