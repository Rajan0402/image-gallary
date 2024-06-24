
const mockUrls=[
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg",
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg",
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg",
  "https://utfs.io/f/41e9b350-2436-48b8-b1b8-279a74a5a403-tz9yt0.jpg"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}))

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="max-w-96">
            <img src={image.url} alt="test"/>
          </div>
        ))}
      </div>
      test
    </main>
  );
}
