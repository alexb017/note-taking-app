import CreateNote from '@/components/create-note';

export default function Notes() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <CreateNote />
        </div>
        <h1>My notes</h1>
      </div>
    </>
  );
}
