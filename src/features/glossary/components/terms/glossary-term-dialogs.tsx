'use client';

import { BulkImportDialog } from '../dialogs/bulk-import-dialog';
import { DeleteTermDialog } from './delete-term-dialog';
import { EditTermDialog } from './edit-term-dialog';
import type { Term } from '../../types';

interface GlossaryTermDialogsProps {
  glossaryId: string;
  selectedTerm: Term | null;
  editOpen: boolean;
  deleteOpen: boolean;
  bulkImportOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  onDeleteOpenChange: (open: boolean) => void;
  onBulkImportOpenChange: (open: boolean) => void;
  remainingTermSlots: number;
}

export function GlossaryTermDialogs({
  glossaryId,
  selectedTerm,
  editOpen,
  deleteOpen,
  bulkImportOpen,
  onEditOpenChange,
  onDeleteOpenChange,
  onBulkImportOpenChange,
  remainingTermSlots,
}: GlossaryTermDialogsProps) {
  return (
    <>
      <EditTermDialog
        open={editOpen}
        onOpenChange={onEditOpenChange}
        glossaryId={glossaryId}
        term={selectedTerm}
      />
      <DeleteTermDialog
        open={deleteOpen}
        onOpenChange={onDeleteOpenChange}
        glossaryId={glossaryId}
        term={selectedTerm}
      />
      <BulkImportDialog
        open={bulkImportOpen}
        onOpenChange={onBulkImportOpenChange}
        glossaryId={glossaryId}
        remainingTermSlots={remainingTermSlots}
      />
    </>
  );
}
