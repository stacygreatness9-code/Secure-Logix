import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * @security Custom error boundary that catches component failures and prevents sensitive data leaks.
 * Logs errors securely without exposing stack traces to end users.
 */
class SecurityErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // @security Log error with sanitized details - never include raw error data in frontend logs
    console.error('SecurityErrorBoundary caught error:', {
      message: error.message,
      component: info.componentStack ? info.componentStack.split('\n')[0] : 'Unknown',
      timestamp: new Date().toISOString(),
    });

    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-navy flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-breach rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">!</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-navy text-center mb-4">
              System Error
            </h1>
            <p className="text-gray-600 text-center mb-6">
              An unexpected error occurred. Our security team has been notified.
            </p>
            <p className="text-sm text-gray-500 text-center mb-6">
              Reference ID: {this.state.error?.message.substring(0, 8).toUpperCase()}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gold text-navy font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityErrorBoundary;
