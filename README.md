<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1sQFm-uAoPfdqb1b_W0fHAZZqYP-wfYJv

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Netlify

Detailed instructions can be found in [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md).

1. **Option 1 (GitHub)**: Push to GitHub and import in Netlify.
2. **Option 2 (Manual)**: Run `npm run build` and drag the `dist` folder to Netlify Drop.
