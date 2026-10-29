# Portfolio Owner Guide

This guide covers deploying the portfolio, receiving contact-form submissions,
editing the profile picture and projects, and running the site locally.

> **Visibility:** This repository is public, so this guide is visible on
> GitHub. Netlify currently publishes the repository root, which also makes
> Markdown files available at their corresponding site URLs. Do not put
> passwords, tokens, private contact details, or other secrets in this file.

## Deploy with Netlify

1. Sign in to [Netlify](https://app.netlify.com/) and choose **Add new site** >
   **Import an existing project**.
2. Connect GitHub and select `sally-m-muthoni/OfficialPortfolio`.
3. Keep the build command empty. The included `netlify.toml` sets the publish
   directory to the repository root.
4. Deploy the site. Netlify will provide a public URL. A custom domain can be
   connected later in the site's domain settings.

## Receive contact messages

The contact form uses Netlify Forms and does not need an API key or endpoint in
the website.

1. In the Netlify site dashboard, open **Forms** and enable form detection if
   prompted.
2. Trigger a new deploy so Netlify can scan the form markup.
3. Under the form's notification settings, add an email notification to
   `sallymuthoni.m@gmail.com`.
4. Confirm any verification email Netlify sends.
5. Submit a test message through the deployed contact form and check that the
   notification reaches your inbox.

The site's email and telephone links open the visitor's email or phone app.
The form submits messages to Netlify; its email notification must be configured
as described above.

## Update the profile picture or projects

1. Open [Pages CMS](https://pagescms.org/) and sign in with the GitHub account
   that owns this repository or has write access to it.
2. Select `sally-m-muthoni/OfficialPortfolio` and the branch Netlify deploys
   (usually `main`).
3. Open **Profile** to upload or select a profile picture and save the change.
4. Open **Projects** to add, edit, reorder, or remove projects. Each project
   can include a title, category, description, overview image, GitHub URL, and
   live website URL.
5. Save your changes. Pages CMS commits them to GitHub, and Netlify publishes
   the updated site automatically.

Only people with GitHub write access to the repository can commit content
changes. Visitors to the portfolio cannot edit the picture or projects. Give
repository write access only to people you trust.

Pages CMS is configured in `.pages.yml`. Editable content is stored in
`content/profile.json` and `content/projects.json`; uploaded images go in
`assets/`.

### Show CMS updates in your local copy

Pages CMS saves changes to GitHub. It does not update files already on your
computer. To bring the latest published repository changes into your local
copy, first save or commit any local edits, then run this from the repository
folder:

```powershell
git pull origin main
```

Netlify deploys the GitHub version; a local preview serves only the version
currently saved on your computer.

## Run locally

The project has no package installation or build step. From the repository
folder, start a local static server:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. The content files are fetched by the
website, so opening `index.html` directly as a `file://` URL will not load
projects or the CMS-managed picture.
