import { useState } from 'react';
import imageCompression from 'browser-image-compression';

const useImageUpload = (isComp = true, imgMaxSize = 0.5, imgMaxWidthHeight = 420, reset = true) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [img, setImg] = useState(null);

  const encodeFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(resolve => {
      reader.onload = () => {
        setPreviewImage(reader.result);
        resolve();
      };
    });
  };

  const fileValidate = file => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const fileExtension = file.name.toLowerCase().split('.').pop();
    const maxSizeInBytes = 10 * 1024 * 1024;

    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage(`${fileExtension}은(는) 업로드가 허용되지 않는 확장자입니다.`);
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setErrorMessage('10MB 이내 파일을 업로드해주세요.');
      return false;
    }
    return true;
  };

  const handleFileChange = e => {
    setErrorMessage('');
    const file = e.target.files[0];

    if (file && fileValidate(file)) {
      try {
        imageCompression(file, {
          maxSizeMB: imgMaxSize,
          maxWidthOrHeight: imgMaxWidthHeight,
        }).then(compressedFile => {
          const extension = file.name.split('.')[1].toLowerCase();
          const fileType = ['svg', 'gif'].includes(extension) ? extension : 'webp';
          const newFile = new File([compressedFile], file.name, {
            type: `image/${fileType}`,
          });
          console.log(newFile);
          setImg(newFile);
          encodeFile(newFile);
        });
      } catch (error) {
        setErrorMessage('이미지 압축 중 오류가 발생했습니다.');
      }
    }
  };
  return { errorMessage, previewImage, img, handleFileChange };
};

export default useImageUpload;
