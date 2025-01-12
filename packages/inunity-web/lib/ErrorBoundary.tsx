import React, { Component, ErrorInfo, ReactNode } from "react";
import { CustomError } from "./fetchExtended";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error instanceof CustomError && error.code === 401) {
      console.error("401 오류가 발생했습니다:", error);
      // 여기에 401 오류에 대한 추가 처리를 구현할 수 있습니다.
    }
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>오류가 발생했습니다.</h1>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
