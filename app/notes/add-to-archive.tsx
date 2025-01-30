import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import { updateIsArchived } from '@/lib/actions';
import TooltipWrap from '@/components/tooltip-wrap';

export default function AddToArchive({
  uid,
  noteId,
  isArchived,
}: {
  uid: string;
  noteId: string;
  isArchived: boolean;
}) {
  return (
    <TooltipWrap
      content={!isArchived ? 'Archive' : 'Unarchive'}
      events={{ onClick: async () => await updateIsArchived(uid, noteId) }}
    >
      {!isArchived ? (
        <ArchiveBoxArrowDownIcon className="w-5" />
      ) : (
        <ArchiveBoxXMarkIcon className="w-5" />
      )}
    </TooltipWrap>
  );
}
