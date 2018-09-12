const codecommit = require('@aws-cdk/aws-codecommit');
const codebuild = require('@aws-cdk/aws-codebuild')
const cdk = require('@aws-cdk/cdk');
const buildable = require('buildable');
const config = require('./pipeline.json');

class JsiiSample extends cdk.Stack {
  constructor(parent, id) {
    super(parent, id);

    const repo = new buildable.GitHubRepo({
      repository: 'eladb/jsii-hello-world',
      tokenParameterName: 'eladb-github-token'
    });

    // const repo = new buildable.CodeCommitRepo(codecommit.RepositoryRef.import(this, 'Repository', {
    //   repositoryName: new codecommit.RepositoryName('jsii-sample')
    // }));

    const pipeline = new buildable.Pipeline(this, 'Pipeline', {
      repo,
      buildEnvironment: {
        buildImage: new codebuild.LinuxBuildImage('585695036304.dkr.ecr.us-east-1.amazonaws.com/superchain:latest'),
      }
    });

    const signingKey = new buildable.SigningKey(this, 'SigningKey', {
      scope: 'jsii-sample',
      identity: 'Elad Ben-Israel',
      email: 'elad.benisrael@gmail.com'
    });

    pipeline.publishToNpm({ npmTokenSecret: config.npm.token });
    pipeline.publishToNuGet({ nugetApiKeySecret: config.nuget.apiKey });
    pipeline.publishToMaven({
      mavenLoginSecret: config.maven.login,
      stagingProfileId: config.maven.stagingProfileId,
      signingKey,
    });
  }
}

const app = new cdk.App(process.argv);
new JsiiSample(app, 'jsii-sample-pipeline');
process.stdout.write(app.run());
