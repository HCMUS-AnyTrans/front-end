"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RecentJobsTableLoading() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-11 px-4 lg:px-6">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="hidden h-11 px-4 sm:table-cell lg:px-6">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="h-11 px-4 lg:px-6">
              <Skeleton className="h-4 w-14" />
            </TableHead>
            <TableHead className="hidden h-11 px-4 sm:table-cell lg:px-6">
              <Skeleton className="ml-auto h-4 w-14" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="px-4 py-3.5 lg:px-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 shrink-0 rounded" />
                  <Skeleton className="h-4 w-32 sm:w-44" />
                </div>
              </TableCell>
              <TableCell className="hidden px-4 py-3.5 sm:table-cell lg:px-6">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="size-3 rounded-full" />
                  <Skeleton className="h-4 w-6" />
                </div>
              </TableCell>
              <TableCell className="px-4 py-3.5 lg:px-6">
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              <TableCell className="hidden px-4 py-3.5 sm:table-cell lg:px-6">
                <div className="flex items-center justify-end gap-1">
                  <Skeleton className="size-3.5 rounded" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

type RecentJobsTableErrorProps = {
  onRetry: () => void;
  isRetrying?: boolean;
};

export function RecentJobsTableError({
  onRetry,
  isRetrying = false,
}: RecentJobsTableErrorProps) {
  const t = useTranslations("dashboard.recentJobs");

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:px-6">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-6" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {t("loadErrorTitle")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("loadErrorDescription")}
          </p>
        </div>
        <Button variant="outline" onClick={onRetry} disabled={isRetrying}>
          {t("retry")}
        </Button>
      </div>
    </div>
  );
}
