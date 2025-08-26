# Deployment Status

Add these badges to your main README.md to show deployment status:

```markdown
## Deployment Status

[![Deploy](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/deploy.yml)
[![CI](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/ci.yml)
[![Pages](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/npm-grunt.yml/badge.svg)](https://github.com/YOUR_USERNAME/Pledgr/actions/workflows/npm-grunt.yml)

## Quick Start

### Development
```bash
# Install dependencies
cd app-registerUI
pnpm install

# Start development server
pnpm dev
```

### Smart Contracts
```bash
# Install Foundry dependencies
forge install

# Build contracts
forge build

# Run tests
forge test

# Deploy to Fuji testnet
forge script script/DeployCreatorRegistry.s.sol --rpc-url fuji --broadcast
```

### Deployment

The project uses GitHub Actions for automated deployment:

- **CI Pipeline**: Runs on every PR and push to develop
- **Staging Deployment**: Automatic on push to main branch
- **Production Deployment**: Manual trigger via GitHub Actions UI

See [Workflow Documentation](.github/workflows/README.md) for detailed setup instructions.
```

Replace `YOUR_USERNAME` with your actual GitHub username.
