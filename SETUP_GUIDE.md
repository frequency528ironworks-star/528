# GitHub Pages + Namecheap Domain Setup Guide

---

## Admin Sign-In & Photo Upload Setup

### How the admin system works

The website now has a **real admin sign-in** system. Here is what was built:

- Click **"Edit / Sign In"** on the site to open the admin sign-in modal.
- Enter the admin password — it is verified with SHA-256 (no plain-text password stored).
- After signing in, the **Admin Upload** section appears at the bottom of the page.
- You can drag-and-drop or click to select photos, then click **Upload Photos**.
- Photos are committed directly to this GitHub repository (in `admin/uploads/`) using the GitHub API.
- The **Portfolio Gallery** section automatically shows all uploaded photos.
- You can delete photos from the gallery when in Admin Mode.

---

### Default Admin Password

**Default password: `frequency528`**

You should change this after your first sign-in:
1. Sign in with the default password.
2. Scroll down to the **Admin Upload** section.
3. Enter a new password (minimum 8 characters) in the **Change Admin Password** fields.
4. Click **Update Password** — your new password is saved in your browser.

> **Note:** The password is stored as a SHA-256 hash in your browser's localStorage.
> If you clear your browser data, the password resets to the default `frequency528`.
> To permanently change the default, update the `DEFAULT_ADMIN_HASH` constant in `index.html`
> with the SHA-256 hash of your new password.

---

### One-Time GitHub PAT Setup (required for photo uploads)

To upload photos, you need a **GitHub Personal Access Token (PAT)**. This is a secret key
that lets the website commit photos to this repository on your behalf.

**Step 1 — Create the PAT (takes ~2 minutes):**

1. Go to: **https://github.com/settings/tokens?type=beta** (fine-grained PAT)
2. Click **"Generate new token"**
3. Give it a name, e.g. `frequency528-upload`
4. Set **Expiration** to 1 year (or "No expiration")
5. Under **Repository access**, select: **Only select repositories → frequency528ironworks-star/528**
6. Under **Permissions → Repository permissions**, set:
   - **Contents**: Read and write
   - Leave everything else as "No access"
7. Click **Generate token** and copy the token (starts with `github_pat_...`)

> Keep this token private. It only has permission to write files to this one repo.

**Step 2 — Enter the PAT in the website:**

1. Sign in to the admin panel on your website
2. The **"One-Time Setup Required"** panel will appear automatically
3. Paste your token into the field and click **Save**
4. Your token is saved in your browser's localStorage (not in the code)

**Step 3 — Start uploading:**

After saving the PAT, use the upload zone to select and upload portfolio photos.
They will be committed to `admin/uploads/` in this repository and appear in the
Portfolio Gallery section within seconds.

---

### Updating your PAT when it expires

If your PAT expires, uploads will fail. To update it:
1. Sign in to the admin panel
2. Under **"Update GitHub PAT"**, enter your new token
3. Click **Update PAT**

---

## Step 1: Enable GitHub Pages (5 minutes)

1. Go to your repository: https://github.com/frequency528ironworks-star/528
2. Click **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select:
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

Your site will now be available at: `https://frequency528ironworks-star.github.io/528/`

---

## Step 2: Connect Your Namecheap Domain (10 minutes)

### 2a. Configure GitHub (DNS records needed)

In GitHub Pages settings, you'll see a section for **Custom domain**:
- Enter: `frequency528ironworks.com`
- Click **Save**

GitHub will create a CNAME file in your repo automatically.

### 2b. Configure Namecheap DNS

1. Go to **Namecheap.com** and log in
2. Click **Domain List** in left sidebar
3. Find `frequency528ironworks.com` and click **Manage**
4. Go to **Advanced DNS** tab
5. Under "Host Records", add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 30 min |
| A | @ | 185.199.109.153 | 30 min |
| A | @ | 185.199.110.153 | 30 min |
| A | @ | 185.199.111.153 | 30 min |
| CNAME | www | frequency528ironworks-star.github.io | 30 min |

6. Click **Save Changes**
7. Wait 24 hours for DNS to propagate (usually faster)

### 2c. Verify in GitHub

Back in your GitHub Pages settings:
1. Under "Custom domain" enter: `frequency528ironworks.com`
2. Check the box for **Enforce HTTPS** (once it's available, usually after 24 hours)
3. Click **Save**

---

## Step 3: Test Your Site

After DNS propagates (15 mins - 24 hours):

✅ Visit: https://frequency528ironworks.com  
✅ Should show your Frequency-528 Iron Works website!

---

## Troubleshooting

**DNS not working?**
- Wait 24 hours for full propagation
- Clear browser cache (Ctrl+Shift+Delete)
- Check Namecheap DNS was saved

**HTTPS not available?**
- Wait 24 hours after DNS is set up
- Then enable "Enforce HTTPS" in GitHub Pages settings

**Website showing 404?**
- Ensure GitHub Pages is enabled (Settings > Pages)
- Check "Deploy from branch" is set to `main`
- Verify CNAME file exists in repository

---

## Updating Your Website

After everything is set up:

1. Make changes to files in your repository
2. Commit changes
3. Push to `main` branch
4. GitHub automatically deploys in ~1 minute
5. Visit frequency528ironworks.com to see updates

---

## Email Integration for Forms

To make the Free Estimate form work, add to your code:

**Using Formspree (Recommended):**

1. Go to https://formspree.io
2. Sign up with your email
3. Add a new project for `frequency528ironworks.com`
4. It will give you a Form ID (e.g., `f_abc123xyz`)

Then update `estimate.html` form:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace `YOUR_FORM_ID` with your actual ID.

---

## Next Steps

1. ✅ Enable GitHub Pages (repo settings)
2. ✅ Configure Namecheap DNS
3. ✅ Set custom domain in GitHub Pages
4. ✅ Wait for DNS propagation & HTTPS
5. ✅ Upload real images to replace placeholders
6. ✅ Test website at frequency528ironworks.com

---

## Support

- GitHub Pages Help: https://docs.github.com/en/pages
- Namecheap DNS Help: https://www.namecheap.com/support/knowledgebase/
- Formspree Help: https://formspree.io/help

**You're all set! Your website will be live at frequency528ironworks.com soon! 🎉**
