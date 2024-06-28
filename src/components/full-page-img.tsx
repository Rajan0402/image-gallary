// import { div } from './modal';

import { getImages } from "@/server/queries";

export default async function FullPullImgView(props:{id: number}) {
  const image = await getImages(props.id)
  return <img src={image.url} className="w-3/5 object-contain"/>;
}