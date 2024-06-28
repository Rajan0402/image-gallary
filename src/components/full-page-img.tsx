// import { div } from './modal';

import { getImages } from "@/server/queries";

export default async function FullPullImgView(props:{id: number}) {
  const image = await getImages(props.id)
  return (
    <div className="flex w-full h-full bg-green-500 text-white">
        <div className="flex-shrink flex justify-center items-center">
            <img src={image.url} className="object-contain"/>
        </div>
        <div className="flex flex-col w-48 flex-shrink-0">
            <div className="text-xl font-bold">{image.name}</div>
        </div>
    </div>);
}