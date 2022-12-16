import * as core from '@actions/core'
import * as github from '@actions/github'


const code = async()=>{
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    const token = core.getInput('token')
    console.log('myToken', token)
    const context = github.context
    const git = github.getOctokit(token)
    await git.rest.repos.createRelease({
        owner: core.getInput('owner'),
        repo: core.getInput('repo'),
        tag_name: "1.2"
    })
    console.log('done1')
}
try {
  code()



} catch (error) {
    // @ts-ignore
    core.setFailed(error.message);
}