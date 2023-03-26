const { Octokit } = require('@octokit/core')
const yaml = require('js-yaml')
const fs = require('fs')

// Set up auth for Octokit
const octokit = new Octokit({
  auth: process.env.GH_TOKEN
})

// Set organization name
const org = 'ash-tree-development'
const configFile = 'teams.yaml'

// Function to read yaml config
function readConfig () {
  try {
    const doc = yaml.load(fs.readFileSync(configFile, 'utf8'))
    const jsonString = JSON.stringify(doc)
    return jsonString
  } catch (e) {
    console.log(e)
  }
}

// Function to get all teams in the org
async function getTeams () {
  return await octokit.request('GET /orgs/{org}/teams', {
    org: `${org}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

// Function to create team
async function createTeam (name, description) {
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

// Function to update team
async function updateTeam (name, description) {
  await octokit.request('PATCH /orgs/{org}/teams/{team_slug}', {
    org: `${org}`,
    name: `${name}`,
    description: `${description}`,
    team_slug: `${name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

// Function to get team based on team-slug
async function getTeam (name) {
  return await octokit.request('GET /orgs/{org}/teams/{team_slug}', {
    org: `${org}`,
    team_slug: `${name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

async function teamExists (team) {
  try {
    await getTeam(team)
    return true
  } catch {
    return false
  }
}

// Call start
(async () => {
  const teamConfig = readConfig()

  // Converting JSON-encoded string to JS object
  const obj = JSON.parse(teamConfig)

  for (const key in obj) {
    for (const key1 in obj[key]) {
      const team = obj[key][key1]

      if (await teamExists(team.name)) {
        console.log(`Team ${team.name} exists. Updating...`)
        updateTeam(team.name, team.description)
      } else {
        console.log(`Team ${team.name} does not exist. Creating...`)
        createTeam(team.name, team.description)
      }
    }
  }

  console.log(await getTeams())
})()
