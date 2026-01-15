# 🐙 How to Push Your Code to GitHub

Your project is now a Git repository! Follow these simple steps to put it on GitHub.

## Step 1: Create a Repository on GitHub
1. Log in to [GitHub.com](https://github.com).
2. Click the **+** icon in the top-right corner and select **New repository**.
3. Name it `akeventz` (or whatever you like).
4. **Important**: Select **"Public"** (so you can deploy it easily for free).
5. **DO NOT** check "Add a README", ".gitignore", or "license" (we already have these).
6. Click **Create repository**.

## Step 2: Push Your Code
Once the repository is created, GitHub will show you a page with commands. Look for the section **"…or push an existing repository from the command line"**.

Copy and run these 3 commands in your terminal (one by one):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/akeventz.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

## Step 3: Make it Live (Deploy) to the World 🌍

Just putting code on GitHub implies other developers can see it, but regular users can't "use" the app yet.
To make it a working website like `www.akeventzz.com`:

1.  **Read the `DEPLOYMENT_GUIDE.md` file** in this folder.
2.  It explains how to connect your new GitHub repository to **Vercel** (for the frontend) and **Render** (for the backend).

Once you do that, anyone in the world can visit your URL and use the app!
