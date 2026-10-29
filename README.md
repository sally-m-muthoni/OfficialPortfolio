# Sally Muthoni's Portfolio

A static portfolio website that can be deployed publicly with Netlify. Project
details and the profile picture are stored as content files and can be updated
through Pages CMS without editing the website code.

## Deploy the website with Netlify

1. Sign in to [Netlify](https://app.netlify.com/) and choose **Add new site** >
   **Import an existing project**.
2. Connect GitHub and select `sally-m-muthoni/OfficialPortfolio`.
3. Keep the build command empty. The included `netlify.toml` sets the publish
   directory to the repository root.
4. Deploy the site. Netlify will provide a public URL. You can connect a custom
   domain later in the site's domain settings.
5. In the Netlify site dashboard, open **Forms** and enable form detection if
   prompted, then trigger a new deploy so Netlify can scan the form markup.
6. Under the form's notification settings, add an email notification to
   `sallymuthoni.m@gmail.com`. Confirm any verification email Netlify sends.
7. Submit a test message through the deployed contact form and check that the
   notification reaches your inbox.

The contact form uses Netlify Forms; it does not need an API key or endpoint in
the website. Submissions are handled by Netlify after deployment. The email and
telephone links open the visitor's email or phone app. Form notification
delivery must be configured in Netlify as described above.

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
changes. The website itself is public, but visitors cannot edit the picture or
projects. Do not grant repository write access to people you do not trust.

The CMS configuration is in `.pages.yml`. Editable content is stored in
`content/profile.json` and `content/projects.json`; uploaded images go in
`assets/`.

## Run locally

The project has no package installation or build step. From the repository
folder, start a local static server:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. The content files are fetched by the
website, so opening `index.html` directly as a `file://` URL will not load
projects or the CMS-managed picture.

## Contact details

- Email: `sallymuthoni.m@gmail.com`
- Phone: `+254 792 180 537`
- GitHub: <https://github.com/sally-m-muthoni>
- LinkedIn: <https://www.linkedin.com/in/sally-muthoni-262aa5314>
