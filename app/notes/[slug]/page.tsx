export default function Page({ params }: { params: { slug: string } }) {
  return <div>My notes: {params.slug}</div>;
}
