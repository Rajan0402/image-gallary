import Image from "next/image";

const mockUrls=[
  // "https://utfs.io/f/1b28723c-f1cf-4586-8822-d0846f705caf-z9awnr.jpg",
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg",
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg",
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg",
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}))

console.log(mockImages)

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div className="max-w-96">
            <Image src={image.url} alt="test"/>
          </div>
        ))}
      </div>
      test
    </main>
  );
}
