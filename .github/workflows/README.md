# GitHub Workflows Documentation

This document explains the GitHub workflows set up for the Pledgr project and how to configure them.

## Workflows Overview

### 1. `deploy.yml` - Main Deployment Workflow

This comprehensive workflow handles:
- Smart contract testing and deployment to Avalanche Fuji
- Frontend build and deployment to GitHub Pages/Netlify
- The Graph subgraph deployment
- Security scanning and notifications

**Triggers:**
- Push to `main` branch (full deployment)
- Push to `develop` branch (Netlify deployment only)
- Manual dispatch with environment selection
- Pull requests to `main` (testing only)

### 2. `ci.yml` - Continuous Integration

Lightweight workflow for testing and validation:
- Smart contract compilation and testing
- Frontend build and linting
- Subgraph compilation

**Triggers:**
- Pull requests to `main` or `develop`
- Push to `develop` branch

## Required GitHub Secrets

Navigate to **Settings > Secrets and variables > Actions** in your GitHub repository and add these secrets:

### Smart Contract Deployment
```
AVALANCHE_FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
DEPLOYER_PRIVATE_KEY=0x...  # Private key for deployment wallet
SNOWTRACE_API_KEY=...       # API key for contract verification on Snowtrace
```

### Frontend Environment Variables
```
VITE_GRAPHQL_ENDPOINT=https://api.studio.thegraph.com/query/.../pledgr/v0.0.1
VITE_INFURA_RPC=https://avalanche-fuji.infura.io/v3/YOUR_PROJECT_ID
```

### The Graph Deployment
```
GRAPH_DEPLOY_KEY=...        # Deploy key from The Graph Studio
```

### Netlify Deployment (Optional)
```
NETLIFY_AUTH_TOKEN=...      # Netlify personal access token
NETLIFY_SITE_ID=...         # Your Netlify site ID
```

### Notifications (Optional)
```
SLACK_WEBHOOK_URL=...       # Slack webhook for deployment notifications
```

## Deployment Environments

### Staging (Default)
- Triggered on pushes to `main` or manual dispatch
- Deploys to Avalanche Fuji testnet
- Frontend deployed to GitHub Pages

### Production
- Manual dispatch only
- Same as staging but with production environment context
- Can be configured for mainnet deployment

## Workflow Jobs Breakdown

### Smart Contract Jobs

1. **contracts** - Tests and builds smart contracts
2. **deploy-contracts** - Deploys to Avalanche Fuji with verification
3. **deploy-subgraph** - Updates The Graph subgraph with new contract addresses

### Frontend Jobs

1. **frontend** - Builds React application with Vite
2. **deploy-frontend** - Deploys to GitHub Pages
3. **deploy-netlify** - Alternative deployment to Netlify (develop branch)

### Quality Assurance

1. **security** - Runs vulnerability scans and security audits
2. **notify** - Sends deployment status notifications

## Setting Up Deployment

### 1. Configure Secrets
Add all required secrets to your GitHub repository settings.

### 2. Enable GitHub Pages
1. Go to **Settings > Pages**
2. Set source to "GitHub Actions"
3. The workflow will handle the rest

### 3. Set Up The Graph Studio
1. Create a subgraph at [The Graph Studio](https://thegraph.com/studio/)
2. Get your deploy key
3. Add it to GitHub secrets as `GRAPH_DEPLOY_KEY`

### 4. Configure Netlify (Optional)
1. Create a Netlify site
2. Get your site ID and auth token
3. Add them to GitHub secrets

## Manual Deployment

To trigger a manual deployment:

1. Go to **Actions** tab in your repository
2. Select "Deploy Pledgr" workflow
3. Click "Run workflow"
4. Choose environment (staging/production)
5. Click "Run workflow"

## Monitoring Deployments

### GitHub Actions Logs
- Check the **Actions** tab for detailed logs
- Each job provides step-by-step execution details

### Deployment Artifacts
- Contract artifacts stored for 90 days
- Gas reports available for download
- Frontend build artifacts available

### Status Badges
Add these to your README.md:

```markdown
[![Deploy](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/deploy.yml)
[![CI](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/ci.yml)
```

## Troubleshooting

### Common Issues

1. **Contract Deployment Fails**
   - Check `DEPLOYER_PRIVATE_KEY` has sufficient AVAX for gas
   - Verify `AVALANCHE_FUJI_RPC_URL` is accessible
   - Ensure contract compilation succeeds

2. **Frontend Build Fails**
   - Check environment variables are properly set
   - Verify all dependencies in `package.json`
   - Check TypeScript errors in logs

3. **Subgraph Deployment Fails**
   - Verify `GRAPH_DEPLOY_KEY` is correct
   - Check contract address update logic
   - Ensure subgraph schema matches contract events

### Debug Steps

1. Check workflow logs in GitHub Actions
2. Verify all secrets are set correctly
3. Test locally with same environment variables
4. Check external service status (The Graph, Netlify, etc.)

## Security Best Practices

1. **Private Keys**: Never commit private keys to the repository
2. **Environment Variables**: Use GitHub secrets for sensitive data
3. **Access Control**: Limit who can trigger deployments
4. **Monitoring**: Set up notifications for failed deployments
5. **Verification**: Always verify contracts on block explorers

## Customization

### Adding New Environments
Modify the workflow dispatch inputs and environment configurations.

### Changing Deployment Targets
Update the deployment jobs to point to different services or networks.

### Adding Tests
Extend the CI workflow with additional testing steps.

### Custom Notifications
Modify the notification job to use different services (Discord, Teams, etc.).

---

For more information, refer to the individual workflow files and GitHub Actions documentation.
