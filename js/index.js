const { Octokit } = require("@octokit/core");
const yaml = require('js-yaml');
const fs = require('fs');

// Set up auth for Octokit 
const octokit = new Octokit({
    auth: process.env.ORG_GH_TOKEN
})

// Set organization name
let org = "ash-tree-development"
let configFile = "teams.yaml"


// Function to read yaml config
function readConfig() {
    try {
        const doc = yaml.load(fs.readFileSync(configFile, 'utf8'));
        console.log(doc);
    } catch (e) {
        console.log(e);
    }
}


// Function to get all teams in the org
async function getTeams() {
    return await octokit.request('GET /orgs/{org}/teams', {
        org: `${org}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

// Function to create team
async function createTeam(name, description) {
    await octokit.request('POST /orgs/{org}/teams', {
        org: `${org}`,
        name: `${name}`,
        description: `${description}`,
        permission: 'push',
        privacy: 'closed',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

// Function to get team based on team-slug
async function getTeam(teamslug) {
    return await octokit.request('GET /orgs/{org}/teams/{team_slug}', {
        org: `${org}`,
        team_slug: `${teamslug}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

// Call start
(async () => {
    // console.log(await getTeams());

    // createTeam("test-1", "an example team 1")
    // console.log(await getTeam("test-1"))
    readConfig()
})();
