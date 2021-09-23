import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from 'path';

export class QuestionareAPIService extends core.Construct {

	constructor(scope: core.Construct, id: string) {
		super(scope, id);

		const api = new apigateway.RestApi(this, "questionare-api", {
			restApiName: "Serverless Questionare API",
			description: "This is a basic API."
		});

		const handler = new lambda.Function(this, "AppHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset(path.join(__dirname, '/api')),
			handler: "get.main",
			environment: {
				REGION: core.Stack.of(this).region,
				AVAILABILITY_ZONES: JSON.stringify(
				  core.Stack.of(this).availabilityZones,
				),
			}
		});

		const apiIntegration = new apigateway.LambdaIntegration(
			handler,
			{
				requestTemplates: {
					"application/json": '{ "statusCode": "200" }',
				}
			}
		);

		api.root.addMethod("GET", apiIntegration);
	}
}
