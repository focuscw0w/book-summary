export default async function BookPage({
  params,
}: {
  params: { book: string };
}) {
  console.log(params.book);

  return <h1>Book Page</h1>;
}
