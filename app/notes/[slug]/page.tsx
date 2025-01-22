import ViewNotes from '@/app/notes/view-notes';

export default async function NotesCategory({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q: string }>;
}) {
  const slug = (await params).slug;
  const q = (await searchParams).q;

  return <ViewNotes slug={slug} param={q} />;
}
