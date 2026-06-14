'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowRight } from 'lucide-react';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { LanguageLabel } from '@/components/shared/language-label';
import { getJobStatusConfig } from '@/features/dashboard/data';
import type { TranslationJobResponse } from '@/types';

type RecentJobsContentProps = {
  jobs: TranslationJobResponse[];
  onViewDetails: (job: TranslationJobResponse) => void;
};

export function RecentJobsContent({
  jobs,
  onViewDetails,
}: RecentJobsContentProps) {
  const tJobs = useTranslations('dashboard.recentJobs');
  const tStatus = useTranslations('dashboard.status');
  const tHistory = useTranslations('dashboard.history');

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-10 px-3 text-sm font-semibold text-muted-foreground lg:px-4">
              {tJobs('fileName')}
            </TableHead>
            <TableHead className="hidden h-10 px-3 text-sm font-semibold text-muted-foreground sm:table-cell lg:px-4">
              {tJobs('languages')}
            </TableHead>
            <TableHead className="h-10 px-3 text-sm font-semibold text-muted-foreground lg:px-4">
              {tJobs('status')}
            </TableHead>
            <TableHead className="hidden h-10 px-3 text-right text-sm font-semibold text-muted-foreground sm:table-cell lg:px-4">
              {tHistory('columns.credits')}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => {
            const fileName = job.input_file?.name ?? job.job_id;
            const statusCfg = getJobStatusConfig(job.status);

            return (
              <TableRow
                key={job.job_id}
                className="group cursor-pointer hover:bg-muted/30"
                onClick={() => onViewDetails(job)}
              >
                <TableCell className="max-w-[180px] px-3 py-3.5 sm:max-w-[220px] lg:px-4">
                  <div className="flex items-center gap-2.5">
                    <FileTypeIcon fileName={fileName} className="size-5" />
                    <span className="truncate text-[15px] font-semibold text-foreground">
                      {fileName}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="hidden px-3 py-3.5 sm:table-cell lg:px-4">
                  <div className="flex items-center gap-2 text-sm">
                    <LanguageLabel value={job.src_lang} />
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/70" />
                    <LanguageLabel value={job.tgt_lang} />
                  </div>
                </TableCell>

                <TableCell className="px-3 py-3.5 lg:px-4">
                  <Badge
                    variant="outline"
                    className={`rounded-md px-2 py-0.5 text-[13px] font-medium ${statusCfg?.className ?? ''}`}
                  >
                    {tStatus(job.status)}
                  </Badge>
                </TableCell>

                <TableCell className="hidden px-3 py-3.5 text-right sm:table-cell lg:px-4">
                  {job.cost_credits !== undefined ? (
                    <div className="flex items-center justify-end gap-1.5">
                      <Image
                        src="/shared/credit.png"
                        alt="Credits"
                        width={16}
                        height={16}
                        className="size-4 shrink-0"
                      />
                      <span className="text-[15px] font-bold tabular-nums text-foreground">
                        {job.cost_credits}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
