'use client';

import { useState } from 'react';
import { ActivityLogSection } from './activity-log-section';
import { ActivityTabFallback } from './activity-tab.fallback';
import { useActivity } from '../../hooks/use-activity';

export function ActivityTab() {
  const [page, setPage] = useState(1);

  const {
    logs,
    pagination: activityPagination,
    isLoading,
    isFetching: isFetchingActivity,
  } = useActivity({ page, limit: 10 });

  if (isLoading) {
    return <ActivityTabFallback />;
  }

  return (
    <div className="space-y-6">
      <ActivityLogSection
        logs={logs ?? []}
        pagination={activityPagination}
        isFetching={isFetchingActivity}
        onPageChange={setPage}
      />
    </div>
  );
}
