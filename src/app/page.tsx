import { getMyImages } from "@/server/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force dynamic"

async function Images() {
  const images = await getMyImages()

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="max-w-96">
          <Link href={`/img/${image.id}`}>
            <div className="flex justify-center align-middle border-solid border-red-600 ">
              <Image src={image.url} alt={image.name} style={{ objectFit: "contain" }} width={384} height={384}/>
            </div>
          </Link>
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
        <Images/>
      </SignedIn>
    </main>
  );
}
