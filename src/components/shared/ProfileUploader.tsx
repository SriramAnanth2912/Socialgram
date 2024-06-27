import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import imageCompression from 'browser-image-compression';
import { convertFileToUrl } from "@/lib/utils";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const compressImage = async (file: File): Promise<File> => {
  const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
  };
  try {
      const compressedBlob = await imageCompression(file, options);
      // Check if the compressed file is an instance of File
      if (compressedBlob instanceof File) {
          return compressedBlob;
      }
      // If not, convert the Blob to a File
      const compressedFile = new File(
          [compressedBlob], 
          file.name, 
          { type: file.type, lastModified: Date.now() }
      );
      return compressedFile;
  } catch (error) {
      console.error('Error during compression:', error);
      return file;
  }
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const compressedFilesPromises = acceptedFiles.map(file => compressImage(file));
            const compressedFiles = await Promise.all(compressedFilesPromises);
            
            setFile(compressedFiles);
            fieldChange(compressedFiles);
            setFileUrl(convertFileToUrl(compressedFiles[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg", ".ico"],
    },
  });
console.log({fileUrl});
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl? fileUrl : "/assets/icons/profie-placeholder.svg"}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:bbase-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;