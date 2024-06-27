// import { div } from './modal';

import React from "react";

export default function ImgModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <div>{photoId}</div>;
}