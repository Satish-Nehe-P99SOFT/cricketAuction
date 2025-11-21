# Deployment Guide

This application can be deployed using GitHub Actions to various hosting platforms.

## Prerequisites

1. A GitHub repository
2. A hosting service account (Heroku, Railway, Render, etc.)
3. Environment variables configured

## GitHub Actions Setup

### 1. Add Secrets to GitHub Repository

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

#### For Heroku Deployment:

- `HEROKU_API_KEY`: Your Heroku API key (get from https://dashboard.heroku.com/account)
- `HEROKU_APP_NAME`: Your Heroku app name
- `HEROKU_EMAIL`: Your Heroku email

#### For Railway Deployment:

- `RAILWAY_TOKEN`: Your Railway token
- `RAILWAY_SERVICE_ID`: Your Railway service ID

#### For Render Deployment:

- `RENDER_DEPLOY_HOOK`: Your Render deploy webhook URL

### 2. Environment Variables

Make sure your hosting platform has these environment variables set:

```
NODE_ENV=production
PORT=8080
MONGODB_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
```

### 3. Deployment Platforms

#### Option A: Heroku (Recommended for Socket.io)

1. Create a Heroku app:

   ```bash
   heroku create your-app-name
   ```

2. Add MongoDB addon:

   ```bash
   heroku addons:create mongolab:sandbox
   ```

3. Set environment variables:

   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set SECRET=your_secret_key
   ```

4. The GitHub Actions workflow will automatically deploy on push to main/master

#### Option B: Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Railway will auto-detect Node.js and deploy
4. Add environment variables in Railway dashboard
5. The workflow can trigger Railway deployments

#### Option C: Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build --prefix client`
4. Set start command: `npm start`
5. Add environment variables
6. Use the deploy webhook in GitHub Actions

## Manual Deployment

If you prefer to deploy manually:

```bash
# Install dependencies
npm install
npm run client-install

# Build client
npm run build --prefix client

# Start server
npm start
```

## Important Notes

1. **Socket.io Configuration**: Make sure your hosting platform supports WebSockets (Heroku, Railway, Render all do)

2. **CORS Settings**: Update `app.js` to allow your production domain:

   ```javascript
   cors({
     origin: process.env.FRONTEND_URL || "https://your-frontend-domain.com",
     credentials: true,
   });
   ```

3. **MongoDB**: Use MongoDB Atlas (free tier available) for production database

4. **Build Output**: The client build goes to `client/dist` (Vite default), but the code expects `client/build`. Update `vite.config.js` if needed:
   ```javascript
   build: {
     outDir: "build";
   }
   ```

## Troubleshooting

- If build fails, check Node.js version (should be 20.x)
- Ensure all environment variables are set
- Check hosting platform logs for errors
- Verify MongoDB connection string is correct
