import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import { updateIsArchived } from '@/lib/actions';
import TooltipWrap from '@/components/tooltip-wrap';
import { useToast } from '@/hooks/use-toast';

export default function AddToArchive({
  uid,
  noteId,
  isArchived,
}: {
  uid: string;
  noteId: string;
  isArchived: boolean;
}) {
  const { toast } = useToast();

  return (
    <TooltipWrap
      content={!isArchived ? 'Archive' : 'Unarchive'}
      events={{
        onClick: async () => {
          await updateIsArchived(uid, noteId);
          toast({
            description: !isArchived ? 'Note archived' : 'Note unarchived',
          });
        },
      }}
    >
      {!isArchived ? (
        <ArchiveBoxArrowDownIcon className="w-5" />
      ) : (
        <ArchiveBoxXMarkIcon className="w-5" />
      )}
    </TooltipWrap>
  );
}
