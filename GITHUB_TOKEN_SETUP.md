# Setting Up GitHub Personal Access Token (PAT)

## Step 1: Create Your GitHub Token

1. Visit: https://github.com/settings/tokens/new

2. Configure your token:
   - **Note/Description**: "Portfolio Website GitHub API"
   - **Expiration**: Choose 90 days or No expiration
   - **Select scopes** (checkboxes):
     - ✅ `read:user` - Read user profile data
     - ✅ `read:org` - Read organization data (if applicable)
     - ✅ `repo` (optional) - If you want private repo stats

3. Click "Generate token" at the bottom

4. **IMPORTANT**: Copy the token immediately (you won't see it again!)
   - It looks like: `ghp_abc123XYZ...` (40+ characters)

## Step 2: Add Token to Your Project

1. Open the `.env` file in your project root

2. Replace `your_github_token_here` with your actual token:
   ```env
   VITE_GITHUB_TOKEN=ghp_YOUR_ACTUAL_TOKEN_HERE
   VITE_GITHUB_USERNAME=Mohammad-Ghouse-virtuoso
   ```

3. **NEVER commit this file to git!** (It's already in `.gitignore`)

## Step 3: Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## What You'll Get

With the token configured, your GitHub section will display:

- ✅ **Real contribution graph** (last 6 months: July → January)
- ✅ **Accurate stats**:
  - Total contributions this year
  - Longest streak
  - Current streak  
  - This month's contributions
- ✅ **Real counts**:
  - Followers
  - Public repositories
  - Stars earned
- ✅ **Dynamic trophies** based on your actual GitHub activity

## Security Notes

- ✅ Token is stored in `.env` (not tracked by git)
- ✅ Token is only used in browser (Vite exposes `VITE_*` variables)
- ⚠️ For production, consider using a serverless function to keep token server-side
- ⚠️ Public tokens can read your public GitHub data only

## Troubleshooting

### "GitHub token not configured" error
- Make sure `.env` file exists in project root
- Verify token starts with `ghp_`
- Restart the dev server after editing `.env`

### "GitHub API error: 401"
- Token is invalid or expired
- Generate a new token with correct scopes

### "GitHub API error: 403"
- Rate limit exceeded (60 requests/hour without token, 5000 with token)
- Wait an hour or use a different token

### Graph not showing
- Check browser console for errors
- Verify username is correct in `.env`
- Ensure token has `read:user` scope

## Alternative: Keep Synthetic Data

If you don't want to use a token, you can hardcode your stats in `GitHubProfileSection.tsx`:

```typescript
// Around line 70-75, add a fallback:
if (!GITHUB_TOKEN || GITHUB_TOKEN === 'your_github_token_here') {
  // Use hardcoded stats instead
  setStats({
    totalContributions: 500,
    longestStreak: 47,
    currentStreak: 12,
    thisMonth: 45,
    followers: 89,
    repositories: 24,
    stars: 156,
  });
  // Generate synthetic graph...
}
```

## Next: Deploy to Production

For production deployment (Vercel/Netlify), add the token as an environment variable:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `VITE_GITHUB_TOKEN` = your token
3. Redeploy

**Netlify:**
1. Site settings → Build & deploy → Environment
2. Add: `VITE_GITHUB_TOKEN` = your token
3. Trigger new deploy

---

**Need help?** Check the [GitHub API documentation](https://docs.github.com/en/graphql)
