import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { ratelimit } from "@/server/ratelimit";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const fullUserData = await clerkClient.users.getUser(user.userId)
      if(fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User does not have upload permissions!")

      const { success } = await ratelimit.limit(user.userId);
      if(!success) throw new UploadThingError("Ratelimited")
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => { 
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId
      })

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter; 