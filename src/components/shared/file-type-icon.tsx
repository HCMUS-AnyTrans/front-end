import Image from 'next/image';
import { File } from 'lucide-react';
import { cn } from '@/lib/utils';

const FILE_ICON_BY_EXTENSION: Record<string, { src: string; alt: string }> = {
  doc: { src: '/shared/files/doc-icon.png', alt: 'DOC file' },
  docx: { src: '/shared/files/docx-icon.png', alt: 'DOCX file' },
  pdf: { src: '/shared/files/pdf-icon.png', alt: 'PDF file' },
  ppt: { src: '/shared/files/ppt-icon.png', alt: 'PPT file' },
  pptx: { src: '/shared/files/pptx-icon.png', alt: 'PPTX file' },
};

interface FileTypeIconProps {
  fileName: string;
  className?: string;
}

function getFileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

export function FileTypeIcon({ fileName, className }: FileTypeIconProps) {
  const extension = getFileExtension(fileName);
  const icon = FILE_ICON_BY_EXTENSION[extension];

  if (icon) {
    return (
      <span className={cn('relative inline-block shrink-0', className)}>
        <Image
          src={icon.src}
          alt={icon.alt}
          fill
          unoptimized
          className="object-contain"
          sizes="64px"
        />
      </span>
    );
  }

  return <File className={cn(className, 'shrink-0 text-primary')} />;
}
