import { Button } from '@nextui-org/react';
import PinIcon from './icons/pin';
import { updateIsPinned } from '@/lib/actions';

export default function AddToPinButton({
  uid,
  noteId,
}: {
  uid: string;
  noteId: string;
}) {
  return (
    <Button
      isIconOnly
      aria-label="pin"
      radius="full"
      className="min-w-unit-6 w-unit-6 h-6 text-gray-900/60 bg-gray-100/95 hover:bg-gray-200/95"
      onClick={async () => await updateIsPinned(uid, noteId)}
    >
      <PinIcon classname="h-6" />
    </Button>
  );
}
