import React, { Component, ReactNode } from 'react';

// Define TypeScript types for props and state
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

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  triggerError = () => {
    throw new Error('This is a test error.');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={this.triggerError}>Trigger Error</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
