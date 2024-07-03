// import { div } from './modal';

import FullPullImgView from "@/app/common/full-page-img";

export default function ImgPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId)
  if(isNaN(idAsNumber)) throw new Error("Invalid image id")

  return <div><FullPullImgView id={idAsNumber} /></div>;
}