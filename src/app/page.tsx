import { db } from "@/server/db";

export const dynamic = "force dynamic"

export default async function HomePage() {

  const images = await db.query.images.findMany()

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="max-w-96">
            <img src={image.url} alt={image.name}/>
          </div>
        ))}
      </div>
      test
    </main>
  );
}
