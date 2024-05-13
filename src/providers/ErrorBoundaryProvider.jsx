import ErrorBoundary from "@components/layout/ErrorBoundary";
import React from "react";

export default function ErrorBoundaryProvider({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
