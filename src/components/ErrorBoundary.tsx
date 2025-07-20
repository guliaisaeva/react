import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary-box">
          <h1>Something went wrong.</h1>
          <p>Check the console for details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
