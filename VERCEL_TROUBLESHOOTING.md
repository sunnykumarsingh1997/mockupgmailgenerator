# Vercel Auto-Deployment Troubleshooting Guide

If Vercel is not automatically detecting GitHub changes and deploying, follow these steps:

## Common Issues and Solutions

### 1. Check Vercel Project Connection

**Problem:** Project not properly connected to GitHub repository.

**Solution:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Git**
4. Verify the repository is connected:
   - Repository should show: `sunnykumarsingh1997/mockupgmailgenerator`
   - Production Branch should be: `main`
5. If not connected, click **Connect Git Repository** and reconnect

### 2. Verify Webhook Configuration

**Problem:** GitHub webhook not properly configured.

**Solution:**
1. Go to your GitHub repository: https://github.com/sunnykumarsingh1997/mockupgmailgenerator
2. Go to **Settings** → **Webhooks**
3. Look for a webhook from `vercel.com`
4. If missing or shows errors:
   - In Vercel Dashboard → Project Settings → Git
   - Disconnect and reconnect the repository
   - This will recreate the webhook

### 3. Check Branch Configuration

**Problem:** Vercel watching wrong branch.

**Solution:**
1. Vercel Dashboard → Project Settings → Git
2. Ensure **Production Branch** is set to `main`
3. Check **Ignored Build Step** - should be empty or `exit 0`

### 4. Verify Vercel Has Repository Access

**Problem:** Vercel doesn't have permission to access the repository.

**Solution:**
1. Go to GitHub → Settings → Applications → Authorized OAuth Apps
2. Find **Vercel** in the list
3. Ensure it has access to your repository
4. If not, reconnect in Vercel Dashboard

### 5. Check Deployment Settings

**Problem:** Auto-deployments might be disabled.

**Solution:**
1. Vercel Dashboard → Project Settings → Git
2. Ensure **Auto-deploy** is enabled
3. Check **Deploy Hooks** - should be empty (unless you want manual deployments)

### 6. Manual Reconnection (Recommended Fix)

**Step-by-step:**
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Git**
4. Click **Disconnect** (if connected)
5. Click **Connect Git Repository**
6. Select **GitHub**
7. Find and select `mockupgmailgenerator`
8. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
9. Click **Deploy**

### 7. Test the Connection

After reconnecting:
1. Make a small change (add a comment in a file)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test Vercel auto-deploy"
   git push origin main
   ```
3. Go to Vercel Dashboard → **Deployments**
4. You should see a new deployment starting automatically

### 8. Check Vercel Build Logs

If deployments are triggered but failing:
1. Vercel Dashboard → **Deployments**
2. Click on the latest deployment
3. Check **Build Logs** for errors
4. Common issues:
   - Missing environment variables
   - Build command errors
   - Dependency issues

### 9. Verify Environment Variables

**Problem:** Build might be failing due to missing env vars.

**Solution:**
1. Vercel Dashboard → Project Settings → **Environment Variables**
2. Ensure all required variables are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
3. Make sure they're set for **Production**, **Preview**, and **Development**

### 10. Check GitHub Repository Settings

**Problem:** Repository might be private and Vercel needs access.

**Solution:**
1. If repository is private, ensure Vercel has access:
   - GitHub → Repository → Settings → Collaborators & teams
   - Or ensure Vercel OAuth app has access

## Quick Diagnostic Checklist

- [ ] Repository connected in Vercel Dashboard
- [ ] Production branch set to `main`
- [ ] Webhook exists in GitHub (Settings → Webhooks)
- [ ] Webhook shows recent deliveries (check if it's receiving events)
- [ ] Auto-deploy enabled in Vercel
- [ ] Vercel has repository access in GitHub
- [ ] Environment variables are configured
- [ ] Build command is correct: `npm run build`
- [ ] Output directory is correct: `dist`

## Manual Deployment (Temporary Workaround)

If auto-deploy still doesn't work, you can manually trigger:

1. **Via Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

2. **Via Vercel Dashboard:**
   - Go to **Deployments** tab
   - Click **Redeploy** on latest deployment
   - Or click **Deploy** button

## Still Not Working?

1. Check Vercel Status: https://www.vercel-status.com/
2. Check GitHub Status: https://www.githubstatus.com/
3. Contact Vercel Support: support@vercel.com
4. Check Vercel Community: https://github.com/vercel/vercel/discussions

## Recommended: Create vercel.json

Create a `vercel.json` file in your project root to ensure proper configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

