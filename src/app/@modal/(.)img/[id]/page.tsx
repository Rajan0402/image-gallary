import { Modal } from "./modal";
import {FullPageImgView} from "@/common/full-page-img";

export default function ImgModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {

  return <Modal><FullPageImgView photoId={photoId} /></Modal>;
}