import { getMyImages } from "@/server/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";

// export const dynamic = "force dynamic"

async function Image() {
  const images = await getMyImages()

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
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please Sign In
        </div>
      </SignedOut>
      <SignedIn>
        <Image/>
      </SignedIn>
    </main>
  );
}
