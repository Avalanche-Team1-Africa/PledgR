/**
 * file Layout.tsx
 * description Provides the main layout, header, navigation, and footer for the Pledgr app.
 * author Pledgr Team
 * usage Used to wrap all page components in App.tsx.
 * exports Layout (React Functional Component)
 */

"use client"

import type React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "../styles/layout.css"

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Layout component that provides the main structure for the application,
 * including a header with navigation, a main content area, and a footer.
 *
 * - Displays a logo that navigates to the home page when clicked.
 * - Shows navigation buttons ("Creators", "Profile", "Disconnect") on all pages except the home page.
 * - Renders child components within the main content area.
 * - Includes a footer with copyright information.
 *
 * @param {LayoutProps} props - The props for the Layout component.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout structure.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isHomePage = location.pathname === "/"
  // Session: Only show profile/disconnect if wallet is connected
  const walletConnected = Boolean(window.ethereum && window.ethereum.selectedAddress)

  // Wrap children in ErrorBoundary
  const ErrorBoundary = require("./ErrorBoundary").default
  return (
    <div className="layout pledgr-landing">
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate("/")}> 
            <span className="logo-text">🚀 Pledgr</span>
          </div>
          {!isHomePage && (
            <nav className="nav">
              <button className="nav-button" onClick={() => navigate("/creators")}> 
                Creators
              </button>
              <button className="nav-button" onClick={() => navigate("/profile")}> 
                Profile
              </button>
              {/* Only show disconnect if wallet is connected */}
              {walletConnected && (
                <button className="nav-button secondary" onClick={() => {
                  window.location.href = "/"
                }}> 
                  Disconnect
                </button>
              )}
            </nav>
          )}
        </div>
      </header>
      <main className="main">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <footer className="footer pledgr-footer">
        <p>
          &copy; 2025 Pledgr. Empowering creators through blockchain.<br />
          Built with ❤️ by the Pledgr team for the Avalanche ecosystem.<br />
          <strong>Need help?</strong> Visit our <a href="/faq" style={{color:'#81e6d9'}}>FAQ</a> or contact <a href="mailto:support@pledgr.app" style={{color:'#81e6d9'}}>support@pledgr.app</a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
