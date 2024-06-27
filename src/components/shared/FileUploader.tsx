/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { Button } from '../ui/button';

type FileUploaderProps = {
    fieldChange: (files: File[]) => void,
    mediaUrl: string;
}

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


const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);

    const onDrop = useCallback(
        async (acceptedFiles: FileWithPath[]) => {
            // Compress the accepted files
            const compressedFilesPromises = acceptedFiles.map(file => compressImage(file));
            const compressedFiles = await Promise.all(compressedFilesPromises);
            
            setFile(compressedFiles);
            fieldChange(compressedFiles);
            setFileUrl(URL.createObjectURL(compressedFiles[0]));
        }, [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.gif', '.jpeg', '.svg'],
        }
    });

    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
            <input {...getInputProps()} />
            {
                fileUrl ? (
                    <>
                        <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                            <img 
                                src={fileUrl}
                                alt='image'
                                className='file_uploader-img'
                            />
                        </div>
                        <p className='file_uploader-label'>click or Drag to replace</p>
                    </>
                ) : (
                    <div className='file_uploader-box'>
                        <img 
                            src='/assets/icons/file-upload.svg'
                            width={96}
                            height={77}
                            alt='file-upload'/>
                        <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
                        <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG, JPEG</p>

                        <Button className='shad-button_dark_4'>
                            Select form computer
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

export default FileUploader;
