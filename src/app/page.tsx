import { db } from "@/server/db";

export const dynamic = "force dynamic"

async function Image() {

  const images = await db.query.images.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  })

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="max-w-96">
          <img src={image.url} alt={image.name}/>
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  )
}

export default async function HomePage() {


  return (
    <main>
        <Image/>
    </main>
  );
}
