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

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  triggerError = () => {
    try {
      throw new Error('This is a error.  Please look at you console');
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary-box">
          <h1>Something went wrong.</h1>
          <button onClick={this.triggerError}>Trigger Error</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
