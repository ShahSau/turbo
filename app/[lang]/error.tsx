/* eslint-disable react/function-component-definition */

'use client';

import React from 'react';

import EmptyState from '@/app/[lang]/components/EmptyState';

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = () => (
  <EmptyState
    title="Uh Oh"
    subtitle="Something went wrong!"
  />
);
export default ErrorState;
