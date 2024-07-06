// import { div } from './modal';

import {FullPageImgView} from "@/common/full-page-img";

export default function ImgPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {

  return <div><FullPageImgView photoId={photoId} /></div>;
}