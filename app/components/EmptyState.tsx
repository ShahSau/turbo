/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from './Button';
import Heading from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  urlLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  showReset,
  urlLink,
}) => {
  const router = useRouter();

  return (
    <div
      className="h-[60vh] flex flex-col gap-2 justify-center items-center "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && urlLink && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push(`${urlLink}`)}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
