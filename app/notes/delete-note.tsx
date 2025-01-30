import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteNote, deleteImageFromStorage } from '@/lib/actions';
import TooltipWrap from '@/components/tooltip-wrap';

export default function DeleteNoteButton({
  uid,
  noteId,
  imageURL,
}: {
  uid: string;
  noteId: string;
  imageURL?: string;
}) {
  return (
    <TooltipWrap
      content="Delete forever"
      events={{
        onClick: async () => {
          await deleteNote(uid, noteId);

          if (imageURL) {
            await deleteImageFromStorage(imageURL);
          }
        },
      }}
    >
      <TrashIcon className="w-5" />
    </TooltipWrap>
  );
}
