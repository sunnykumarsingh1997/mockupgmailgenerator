# Auto-Deployment Setup Guide

## What This Does

Every time you push code to the `main` branch on GitHub, it will automatically:
1. Pull the latest code on your server
2. Install dependencies
3. Build the production bundle
4. Restart nginx

## Setup Steps

### Step 1: Add GitHub Secrets

Go to your GitHub repository:
1. Navigate to: https://github.com/sunnykumarsingh1997/mockupgmailgenerator/settings/secrets/actions
2. Click "New repository secret"
3. Add these three secrets:

**Secret 1: VPS_HOST**
- Name: `VPS_HOST`
- Value: `84.247.136.87`

**Secret 2: VPS_USER**
- Name: `VPS_USER`
- Value: `sunny`

**Secret 3: VPS_PASSWORD**
- Name: `VPS_PASSWORD`
- Value: `zxcZXC123!@#`

### Step 2: Allow sudo without password for nginx restart

On your VPS server, run:
```bash
ssh sunny@84.247.136.87
sudo visudo
```

Add this line at the end:
```
sunny ALL=(ALL) NOPASSWD: /bin/systemctl restart nginx
```

Save with `Ctrl+X`, then `Y`, then `Enter`.

### Step 3: Push the workflow to GitHub

```bash
cd c:\Users\isunn\.gemini\antigravity\playground\ionic-interstellar
git add .github/workflows/deploy.yml
git commit -m "Add auto-deployment workflow"
git push origin main
```

### Step 4: Test It!

1. Make a small change to your code
2. Push to GitHub: `git push origin main`
3. Go to: https://github.com/sunnykumarsingh1997/mockupgmailgenerator/actions
4. Watch the deployment run!
5. Check your site: https://tools.codershive.in

## How It Works

- **Trigger:** Automatically runs when you push to `main` branch
- **Action:** Connects to your VPS via SSH
- **Process:** Pulls code, builds, and restarts nginx
- **Time:** Usually completes in 1-2 minutes

## Viewing Deployment Status

Check deployment status at:
https://github.com/sunnykumarsingh1997/mockupgmailgenerator/actions

You'll see:
- ✅ Green check = Successful deployment
- ❌ Red X = Failed deployment (check logs)

## Troubleshooting

If deployment fails, check the GitHub Actions logs for errors. Common issues:
- Wrong credentials in secrets
- Permission issues on server
- Build errors in the code
