# Team Management

Simple JS script to interact with the Github API and manage teams.

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
