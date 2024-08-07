"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};11

// ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1

function UploadSVG() {
  return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
  )
}

// function makeSpinnerToast() {
//   return toast(<div className=" text-white text-lg items-center">Upload complete</div>,{
//     duration: 3000,
//   })
// }

// window.makeToast = makeSpinnerToast

function LoadingSpinnerSVG() {
  return (<svg width="24" height="24" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><g className="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" strokeWidth={3}></circle></g></svg>)
}

export function SimpleUploadButton() {
    const router = useRouter()

    const posthog = usePostHog()

    const {inputProps} = useUploadThingInputProps("imageUploader", {
      onUploadBegin() {
        posthog.capture("upload-begin")
      toast(<div className="flex gap-2 text-white text-lg items-center"><LoadingSpinnerSVG/>Uploading...</div>,{
          duration: 1000000,
          id: "upload-begin",
        })
      },
      onUploadError(error) {
        posthog.capture("upload_error", {error})
        toast.dismiss("upload-begin")
        toast.error("Upload Failed!")
      },
      onClientUploadComplete(res) {
        toast.dismiss("upload-begin")
        toast(<div className=" text-white text-lg items-center">Upload complete</div>,{
          duration: 3000,
        })
        router.refresh()
      }
    })

    return (
        <div>
            <label htmlFor="upload-button" title="Upload" className="cursor-pointer"><UploadSVG /></label>
            <input id="upload-button" type="file" className="sr-only" {...inputProps} />
        </div> 
    )
}