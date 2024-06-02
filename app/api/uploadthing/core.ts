import { useAuth, useUser } from "@clerk/nextjs"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { getAuth } from "@clerk/nextjs/server"

const f = createUploadthing()
const auth = (req: Request) => ({ id: "fakeId" }) // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req)

      if (!userId) throw new UploadThingError("Unauthorized")

      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)

      console.log("file url", file.url)
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
