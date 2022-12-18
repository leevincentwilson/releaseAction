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
    git.rest.repos.createRelease({
        owner: core.getInput('owner') || github.context.repo.owner,
        repo: github.context.repo.repo || github.context.repo.repo,
        tag_name: core.getInput('tag'),
        target_commitish: core.getInput('target_commitish'),
        name: core.getInput('name'),
        body: core.getInput('body'),
        draft: core.getInput('draft') ==='true',
        prerelease: core.getInput('prerelease') ==='true',
        discussion_category_name: core.getInput('discussion_category_name'),
        generate_release_notes: core.getInput('generate_release_notes') === 'true'
    })
}
run()