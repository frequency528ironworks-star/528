# GitHub Pages + Namecheap Domain Setup Guide

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

The Free Estimate form is configured to submit to:

```html
<form action="https://formsubmit.co/frequency528ironworks@gmail.com" method="POST">
```

### Activation steps

1. Submit the estimate form once from the live site.
2. Open the confirmation email sent by Formsubmit to `frequency528ironworks@gmail.com`.
3. Click the activation link in that email.

After activation, all new submissions will be delivered to `frequency528ironworks@gmail.com`.

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
- Formsubmit Help: https://formsubmit.co/

**You're all set! Your website will be live at frequency528ironworks.com soon! 🎉**
