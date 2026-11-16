# DAA Final Prep

A static study app for AITU RiAA 2310. Ten lessons, 40 flashcards, eight tested Java references, 20 instructor sample questions, 30 original course-practice questions, a timed mock and mistake review.

## Run locally

From the project root, run `python3 -m http.server 4173 --directory dist` and open http://localhost:4173. No dependencies, API keys or environment variables are required.

## Deploy on Vercel

Import this project into Vercel using a Git repository or the Vercel CLI. The included `vercel.json` selects `dist` as the static output directory. Choose the project root, leave the framework preset at Other, and deploy. The app uses hash navigation, so routes work on static hosting without rewrites.

## Data

Course material is in `dist/content.js`. Progress, open attempts, practice history, and mistakes are stored in the browser using localStorage. Each browser profile and site origin has its own record. Course and assignment links lead to AITU LMS.
