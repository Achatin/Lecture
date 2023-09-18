import { generateImages } from '@/helpers/generate-images';
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

interface ImageSelectorProps {
  keyword: string;
  onSelectImage: (imageUrl: string) => void; // Callback function to handle the selected image URL
}

const ImageSelector: FC<ImageSelectorProps> = ({ keyword, onSelectImage }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await generateImages(keyword);
      if (images) {
        setImageUrls(images);
      }
    };

    fetchImages();
  }, [keyword]);

  const onImageSelect = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    onSelectImage(imageUrl); // Call the callback function to handle the selected image URL
  };

  return (
    <form> {/* Wrap the component in a form */}
      <div className="overflow-x-auto">
        <div className="flex gap-x-1 w-max">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} onClick={() => onImageSelect(imageUrl)} className='m-1.5'> {/* Call onImageSelect with the imageUrl */}
              {imageLoading ? (
                <Skeleton className='h-36 w-48' />
              ) : null}

              <Image
                loading='eager'
                onLoad={() => setImageLoading(false)}
                src={imageUrl}
                alt={`thumbnail picture of ${keyword}`}
                width={200}
                height={200}
                className={`cursor-pointer rounded h-36 w-full
                    ${imageLoading ? 'hidden' : ''}
                    ${imageUrl === selectedImageUrl ? 'outline outline-offset-2 outline-[3px] outline-primary' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default ImageSelector;
