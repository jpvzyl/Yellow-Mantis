# Deploy & Custom Domain (yellow-mantis.com)

## 1. Why old pages still appear (e.g. /full-features)

The app codebase has **only the landing page** and a **server redirect**: any path like `/full-features` or `/introduction-letter` is redirected to `/`.  

If you still see old pages on Heroku, **Heroku is running an old build**. Deploy the latest code:

```bash
heroku login
cd /path/to/Yellow-Manits
git push heroku main
```

After the build finishes, `https://yellow-mantis-pitch-cbf8600f787f.herokuapp.com/full-features` will **redirect to** `https://yellow-mantis-pitch-cbf8600f787f.herokuapp.com/` and only the landing page will show.

---

## 2. Fixing “Your connection is not private” (ERR_CERT_COMMON_NAME_INVALID) on www.yellow-mantis.com

This means the SSL certificate does not match **www.yellow-mantis.com** (e.g. the browser is getting a cert for `*.herokuapp.com` or for `yellow-mantis.com` only).

### Step 1: Add both domains in Heroku

1. Open [Heroku Dashboard](https://dashboard.heroku.com/) → your app (e.g. **yellow-mantis-pitch-cbf8600f787f**).
2. **Settings** → **Domains**.
3. Click **Add domain** and add:
   - `yellow-mantis.com`
   - `www.yellow-mantis.com`
4. Heroku will show a **DNS target** for each (e.g. `yellow-mantis-pitch-cbf8600f787f.herokuapp.com` or a `herokudns.com` hostname). Note them.

### Step 2: Point DNS to Heroku

In your **domain registrar / DNS provider** (where yellow-mantis.com is managed):

- **www.yellow-mantis.com**  
  - Add a **CNAME** record:  
  - Name: `www`  
  - Value: the Heroku DNS target (e.g. `yellow-mantis-pitch-cbf8600f787f.herokuapp.com`).

- **yellow-mantis.com** (apex/root):  
  - Heroku often recommends an **ALIAS** or **ANAME** to the same target, or a CNAME to the app hostname (some providers allow CNAME on apex).  
  - If your provider only allows A records at apex, use the **root domain** target Heroku shows (if any).  
  - Exact steps depend on the provider (Cloudflare, Namecheap, etc.); Heroku’s “Domains” page shows the exact record to add.

### Step 3: Enable SSL (ACM) and wait

1. In Heroku → **Settings** → **Domains**, ensure **Automated Certificate Management** is **enabled**.
2. After DNS propagates (often 5–60 minutes), Heroku will issue certificates for both `yellow-mantis.com` and `www.yellow-mantis.com`.
3. Until both domains are added in Heroku **and** DNS points to Heroku, the certificate will not cover www and you can get `ERR_CERT_COMMON_NAME_INVALID` on **www**.yellow-mantis.com.

### Step 4: Prefer https

- In the app, the canonical URL is set to `https://yellow-mantis.com/`.  
- If you want **www** to be the main URL, change the canonical in `public/index.html` to `https://www.yellow-mantis.com/` and consider redirecting apex to www (or the other way around) in Heroku/DNS if your provider supports it.

---

## Summary

| Issue | Fix |
|-------|-----|
| Old pages (e.g. /full-features) | Deploy latest code: `git push heroku main` |
| ERR_CERT_COMMON_NAME_INVALID on www.yellow-mantis.com | Add **www.yellow-mantis.com** (and apex) in Heroku Domains, point DNS to Heroku, keep ACM on, wait for certs |
