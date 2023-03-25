# Team Management

Simple JS script to interact with the Github API and manage teams.

## Setup

You will need to have a Github PAT token available in your env with the scope `read:org`and `write:org`. The easiest way to do this is run the following:

```bash
export GH_TOKEN="my-super-secret-token"
```

## Usage

```bash
node index.js
```

You will need to create a config file to use called `teams.yaml` that should look something like this:

```yaml
---
teams:
  team-1:
    name: "test-team-1"
    description: "A great first team"
    parent: 
  team-2:
    name: "test-team-2"
    description: "A great second team"
    parent:
```

## References

- [octokit](https://github.com/octokit/core.js#readme)
