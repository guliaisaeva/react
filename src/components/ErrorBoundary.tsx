import { Component, ReactNode } from 'react';

// Define a TypeScript type for the props
interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });

    // You can log the error to the console here
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      // Display a fallback UI for errors
      return <div> Error occurred. Please try again.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
