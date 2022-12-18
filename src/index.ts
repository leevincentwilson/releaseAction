import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
    try {
        await createRelease()
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message)
        }
    }
}

const createRelease = async () =>{
    const token = core.getInput('token')
    const git = github.getOctokit(token)


    type Values = {
        owner: string,
        repo: string,
        tag_name: string,
        target_commitish?: string,
        name?: string,
        body?: string,
        draft: boolean,
        prerelease: boolean,
        discussion_category_name?: string,
        generate_release_notes: boolean
    }

    const {
        owner,
        repo,
        tag_name,
        target_commitish,
        name,
        body,
        draft,
        prerelease,
        discussion_category_name,
        generate_release_notes
    }:Values= {
        owner: core.getInput('owner') || github.context.repo.owner,
        repo: github.context.repo.repo || github.context.repo.repo,
        tag_name: `tags/${core.getInput('tag')}`,
        target_commitish: core.getInput('target_commitish'),
        name: core.getInput('name'),
        body: core.getInput('body'),
        draft: core.getInput('draft') ==='true',
        prerelease: core.getInput('prerelease') ==='true',
        discussion_category_name: core.getInput('discussion_category_name'),
        generate_release_notes: core.getInput('generate_release_notes') === 'true'
    }

    console.log('tagName',tag_name)

    git.rest.repos.createRelease({
        owner,
        repo,
        tag_name,
        ...(target_commitish && {target_commitish}),
        ...(name && {name}),
        ...(body && {body}),
        draft,
        prerelease,
        ...(discussion_category_name && {discussion_category_name}),
        generate_release_notes


    })
}
run()