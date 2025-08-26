# Pledgr AI Coding Agent Instructions

## Project Overview

Pledgr is a decentralized creator monetization platform built on Avalanche blockchain, featuring:
- **Creator Registration & Profiles**: Smart contract-based creator onboarding
- **Staking & Rewards**: Fan engagement through token staking mechanisms  
- **Web3 Integration**: Multi-wallet support (Core Wallet, MetaMask) via Wagmi
- **Modern React UI**: ShadCN/UI components with Tailwind CSS styling

## Architecture & Directory Structure

```
Pledgr/
├── app-registerUI/           # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Route-based page components
│   │   ├── providers/       # React context providers (Web3, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── config/          # Configuration files
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   └── pledg-r/             # The Graph subgraph
├── contracts/               # Solidity smart contracts
├── script/                  # Foundry deployment scripts
├── test/                    # Foundry contract tests
└── docs/                    # Project documentation
```

## Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router DOM (HashRouter for static deployment)
- **UI Library**: ShadCN/UI with Radix primitives
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Query for server state
- **Web3**: Wagmi v2 + Viem + Ethers (legacy support)
- **Form Handling**: React Hook Form + Zod validation

### Blockchain
- **Network**: Avalanche Fuji Testnet
- **Framework**: Foundry for smart contract development
- **Libraries**: OpenZeppelin contracts for security patterns
- **Indexing**: The Graph Protocol subgraph

### Development
- **Package Manager**: pnpm (preferred), npm (fallback)
- **Linting**: ESLint with TypeScript rules
- **Build Tool**: Vite with SWC for fast compilation
- **Testing**: Foundry for contracts, built-in React testing

## Web3 Integration Patterns

### Wallet Connection
```typescript
// Use the existing Web3Provider wrapper
import { useConnect, useAccount, useDisconnect } from 'wagmi';

// Supported wallets: Core Wallet (primary), MetaMask, WalletConnect
// Network: Avalanche Fuji (chainId: 43113)
```

### Contract Interaction
```typescript
// Use custom hooks for contract operations
import { useCreatorRegistry } from '@/hooks/useCreatorRegistry';

// Always include error handling and loading states
// Use React Query for caching and synchronization
```

### Network Configuration
- **Primary Network**: Avalanche Fuji Testnet (43113)
- **RPC Endpoint**: https://api.avax-test.network/ext/bc/C/rpc
- **Contract Address**: Check `contracts/` directory for latest deployment

## Component Development Guidelines

### Component Structure
```typescript
// Standard component template
interface ComponentProps {
  // Use TypeScript interfaces for props
  className?: string; // Always include for styling flexibility
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {/* Component content */}
    </div>
  );
}
```

### Styling Conventions
- **Primary Approach**: Tailwind CSS utility classes
- **Component Variants**: Use `class-variance-authority` for complex variants
- **Responsive Design**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- **Color Scheme**: Dark/light theme support via `next-themes`
- **Component Library**: Prefer ShadCN/UI components over custom implementations

### State Management
- **Server State**: React Query (`@tanstack/react-query`)
- **Client State**: React useState/useReducer + Context for global state
- **Web3 State**: Wagmi hooks for blockchain interactions
- **Form State**: React Hook Form with Zod validation

## File Organization Conventions

### Component Files
```
components/
├── ui/                 # ShadCN/UI components (generated)
├── ComponentName.tsx   # PascalCase for components
└── index.ts           # Re-export barrel files (optional)
```

### Page Components
```
pages/
├── Index.tsx          # Home page
├── CreatorDashboard.tsx
└── NotFound.tsx       # 404 error page
```

### Hooks
```
hooks/
├── use-mobile.tsx     # Utility hooks (kebab-case)
├── useCreatorRegistry.ts  # Business logic hooks (camelCase)
└── use-toast.ts       # Consistent with ShadCN patterns
```

### Utilities
```
lib/
├── utils.ts           # General utilities (cn function, etc.)
└── constants.ts       # App-wide constants
```

## Smart Contract Development

### Contract Standards
- **Solidity Version**: ^0.8.30
- **Security**: OpenZeppelin contracts for standard implementations
- **Access Control**: Use `Ownable` or `AccessControl` patterns
- **Events**: Emit events for all state changes for indexing

### Development Workflow
```bash
# Smart contract development
forge build                # Compile contracts
forge test                 # Run tests
forge script script/Deploy.s.sol  # Deploy contracts

# Frontend development
pnpm dev                   # Start development server
pnpm build                 # Production build
pnpm preview               # Preview production build
```

### Testing Patterns
- **Unit Tests**: Test individual contract functions
- **Integration Tests**: Test contract interactions
- **Frontend Tests**: Test Web3 integration with mock data

## Deployment Guidelines

### Production Build
- **Router**: Use HashRouter for static hosting compatibility
- **Assets**: Relative paths for CDN deployment
- **Error Handling**: Graceful fallbacks for Web3 connection failures
- **Performance**: Code splitting and lazy loading for large components

### Environment Configuration
```typescript
// Use environment variables for configuration
const config = {
  chainId: import.meta.env.VITE_CHAIN_ID || 43113,
  rpcUrl: import.meta.env.VITE_RPC_URL,
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
};
```

### Static Hosting Setup
- **SPA Support**: Include `_redirects` file for routing
- **Asset Optimization**: Enable compression and caching
- **Error Pages**: Custom 404 handling with fallback routes

## Common Patterns & Anti-Patterns

### ✅ Do This
- Use TypeScript strictly - define interfaces for all props and data
- Implement proper error boundaries for Web3 components
- Include loading states for all async operations
- Use React Query for caching blockchain data
- Follow the existing component patterns in `components/ui/`
- Add proper accessibility attributes (ARIA) to interactive elements
- Use environment variables for configuration
- Implement responsive design from the start

### ❌ Avoid This
- Direct blockchain calls without error handling
- Hardcoded contract addresses or network IDs
- Missing loading/error states in components
- Inconsistent file naming conventions
- Large monolithic components (keep under 200 lines)
- Direct DOM manipulation (use React patterns)
- Inline styles instead of Tailwind classes
- Missing TypeScript types (especially for Web3 interactions)

## Development Workflow

### Getting Started
1. **Environment Setup**: Copy `.env.example` to `.env` and configure
2. **Dependencies**: Run `pnpm install` (preferred) or `npm install`
3. **Development**: Use `pnpm dev` for hot reload development
4. **Smart Contracts**: Use `forge build` and `forge test` for contract work

### Code Review Guidelines
- **TypeScript**: Ensure no `any` types without justification
- **Performance**: Check for unnecessary re-renders and optimize queries
- **Security**: Review Web3 interactions for proper validation
- **Testing**: Include tests for new features and bug fixes
- **Documentation**: Update relevant docs for architectural changes

### Git Workflow
- **Branching**: Feature branches from `main`
- **Commits**: Use conventional commit messages
- **Pull Requests**: Include description of changes and testing approach
- **Deployment**: Merge to `main` triggers deployment pipeline

## Troubleshooting Common Issues

### Web3 Connection Problems
- Check wallet is installed and network is correct
- Verify contract address and ABI are up to date
- Test with different wallet providers
- Check RPC endpoint connectivity

### Build/Deployment Issues
- Ensure all environment variables are set
- Check for TypeScript errors with `pnpm build`
- Verify asset paths for static hosting
- Test production build locally with `pnpm preview`

### UI/UX Issues
- Test responsive design on multiple screen sizes
- Verify dark/light theme compatibility
- Check accessibility with screen readers
- Validate form handling and error states

## Key Dependencies & Versions

### Critical Dependencies
- `react`: ^18.3.1 - Core React framework
- `wagmi`: Latest v2 - Web3 wallet management
- `viem`: Latest - Ethereum client library
- `@tanstack/react-query`: ^5.83.0 - Server state management
- `react-router-dom`: ^6.30.1 - Client-side routing
- `tailwindcss`: ^3.4.17 - Utility-first CSS

### Development Dependencies
- `vite`: ^5.4.19 - Build tool and dev server
- `typescript`: ^5.8.3 - Type safety
- `@vitejs/plugin-react-swc`: ^3.11.0 - Fast React compilation
- `eslint`: ^9.32.0 - Code linting

## Project-Specific Conventions

### Creator Registry Contract
- Registration requires: name, bio, avatar URL
- Creators are identified by Ethereum address
- Use events for indexing (CreatorRegistered, CreatorUpdated)
- Support profile updates after registration

### UI Components
- Creator cards should show avatar, name, bio, and stats
- Wallet connection status always visible in navigation
- Form validation with immediate feedback
- Loading spinners for blockchain operations

### Data Flow
1. **User connects wallet** → Web3Provider manages connection state
2. **Creator registration** → Form submission → Contract interaction → UI update
3. **Profile viewing** → Blockchain query → Cache with React Query → Display

## Security Considerations

### Frontend Security
- Validate all user inputs with Zod schemas
- Sanitize data before blockchain transactions
- Use secure RPC endpoints for mainnet
- Implement proper error handling for failed transactions

### Smart Contract Security
- Follow OpenZeppelin patterns for access control
- Use reentrancy guards where applicable
- Validate all input parameters
- Emit events for audit trails

---

*Last Updated: 2024-12-19*  
*For questions or updates to these instructions, please review the latest project documentation in `/docs/` or contact the development team.*
