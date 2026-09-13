# Deployment and Git Workflow Guide for Inteople

This guide explains the safe, professional workflow for this static Netlify site so the right branch gets deployed and the live site stays stable.

## 1. Understand the setup

This project is a static site published directly from the repo root. The Netlify config in `netlify.toml` sets:

- `publish = "."`
- no build command

That means Netlify serves the repo as-is.

The GitHub Actions workflow in `.github/workflows/lint.yml` validates code on push and pull request, but it does not publish the site by itself.

Important: Netlify deployment is controlled by the Netlify project settings, not only by GitHub branch names.

## 2. Production branch recommendation

Use a single production branch for the live site, typically:

- `master` or
- `main`

Recommended workflow:

- Work on feature branches like `restructure-version-isolation`
- Validate and fix all lint issues
- Merge to the production branch
- Push production branch to trigger Netlify deploy

This keeps the live site stable and avoids publishing experimental work accidentally.

## 3. Verify the repo is clean before merging

Run this from the project root:

```bash
cd "/Users/alisohel/Library/Mobile Documents/com~apple~CloudDocs/Desktop/ws/inteople/inteople"

git status
npm run lint
```

Expected result:

- no uncommitted changes unless intentionally preparing a release
- lint completes with exit code 0

## 4. Check the current branch

```bash
git branch --show-current
```

If you are on the feature branch and want to publish to production, switch to the live branch:

```bash
git checkout master
```

If `master` does not exist, use:

```bash
git checkout main
```

## 5. Merge the verified feature branch into the production branch

If you want to keep the feature branch and then merge it in:

```bash
git checkout master
git merge restructure-version-isolation
```

Or, if you prefer a clean flow:

```bash
git checkout master
git pull --ff-only origin master
git merge --no-ff restructure-version-isolation
```

Then push the result:

```bash
git push origin master
```

## 6. If Netlify is configured for a different branch

Check Netlify site settings:

- Site configuration
- Build & deploy
- Production branch

If Netlify is set to deploy from `main` or another branch, push there instead.

Do not assume the branch is `master` unless it is set in Netlify.

## 7. Safe deployment checklist

Before any push to production, use this checklist:

- [ ] `git status` is clean
- [ ] `npm run lint` passes
- [ ] tests or validation steps relevant to the repo pass
- [ ] no half-finished changes are left behind
- [ ] the branch to deploy is the correct one
- [ ] Netlify project is set to that branch

## 8. Quick restore if something goes wrong

If you need to revert the live branch immediately:

```bash
git checkout master
git log --oneline -n 5
git revert <bad-commit-sha>
```

Or, if you need a hard reset to the last known good commit:

```bash
git checkout master
git reset --hard <good-commit-sha>
```

Then push the revert:

```bash
git push origin master --force-with-lease
```

Use `--force-with-lease` only when you are intentionally resetting the remote history and understand the impact.

## 9. Recommended professional workflow

Use this sequence every time:

```bash
cd "/Users/alisohel/Library/Mobile Documents/com~apple~CloudDocs/Desktop/ws/inteople/inteople"

git checkout -b feature/my-fix
git add .
git commit -m "Describe the change"
git push origin feature/my-fix
npm run lint

git checkout master
git pull --ff-only origin master
git merge feature/my-fix
git push origin master
```

## 10. Final recommendation

For this repo, the safest professional setup is:

- keep `master` as the live deploy branch
- validate on feature branches
- merge only verified work into `master`
- confirm Netlify is targeting the same branch

This reduces the risk of accidental deployment while preserving a clean release process.

## 11. Important note

The GitHub Action validates code, but live publishing is controlled by Netlify. So the real deployment requirement is:

- branch must be the one Netlify is set to publish from
- code on that branch must be verified and clean

## 12. Command summary

```bash
cd "/Users/alisohel/Library/Mobile Documents/com~apple~CloudDocs/Desktop/ws/inteople/inteople"

git status
git branch --show-current
npm run lint
git checkout master
git pull --ff-only origin master
git merge restructure-version-isolation
git push origin master
```

If you need to restore quickly:

```bash
git checkout master
git log --oneline -n 5
git revert <commit-sha>
```
