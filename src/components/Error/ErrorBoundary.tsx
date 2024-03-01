'use client';

// no types for react-error-boundary
import { Component, type ReactNode } from 'react';

import ErrorPage from './ErrorPage';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/* error: Error */): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(/* error: Error */): void {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    // console.log(error, window.location.href);
  }

  render(): ReactNode {
    const {
      state: { hasError },
      props: { children },
    } = this;

    if (hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }

    return children;
  }
}

export default ErrorBoundary;
