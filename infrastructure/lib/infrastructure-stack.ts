import * as cdk from '@aws-cdk/core';
import * as api from './api';

export class ElmQuestionareStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		new api.QuestionareAPIService(this, 'QuestionareApi');
	}
}
