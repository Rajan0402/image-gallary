// import { div } from './modal';

import { getImages } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullPullImgView(props:{id: number}) {
  const image = await getImages(props.id)

  const uploaderInfo = await clerkClient.users.getUser(image.userId)
  return (
    <div className="flex w-full h-full bg-zinc-500/90 text-white">
        <div className="flex-shrink flex justify-center items-center border-r p-2">
            <img src={image.url} className="object-contain"/>
        </div>
        <div className="flex flex-col w-48 flex-shrink-0 p-2">
            <div className="border-b text-lg font-bold">{image.name}</div>
            <div className="flex flex-col py-2">
                <span>Uploaded by</span>
                <span>{uploaderInfo.fullName}</span>
            </div>
            <div className="flex flex-col py-2">
                <span>Created On</span>
                <span>{new Date(image.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    </div>);
}