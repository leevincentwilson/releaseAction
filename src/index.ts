import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
    try {
        await createRelease()
    } catch (error) {
        console.log(error)
    }
}

const createRelease = async () =>{
    const token = core.getInput('token')
    const git = github.getOctokit(token)
    console.log('token',token)
    console.log('git',git)
    git.rest.repos.createRelease({
        owner: getOwner(),
        repo: getRepo(),
        tag_name: getTag()
    })
}

const getTag = ():string =>{

    const tag = core.getInput('tag')
    if (tag) {
        return tag;
    }

    const ref = github.context.ref
    const tagPath = "refs/tags/"
    if (ref && ref.startsWith(tagPath)) {
        return ref.substr(tagPath.length, ref.length)
    }

    throw Error("No tag found in ref or input!")
}
const getRepo = ()=>{
    let repo = core.getInput('repo')
    if (repo) {
        return repo
    }
    return github.context.repo.repo
}
const getOwner = () =>{
    let owner = core.getInput('owner')
    if (owner) {
        return owner
    }
    return github.context.repo.owner
}
run()