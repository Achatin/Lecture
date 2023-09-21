"use client"

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { Skeleton } from './ui/skeleton';

interface EmbedProps {
  url: string,
}

const Embed: FC<EmbedProps> = ({ url }) => {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url.trim() !== '') {
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/scrape/', { url });
          if (response.data.error) {
            setError(response.data.error);
            setMetadata(null);
          } else {
            const metadata = response.data;
            setMetadata(metadata);
            setError(null);
          }
        } catch (e) {
          setMetadata(null);
          setError(e.response.data.error);
        }
      };

      fetchData();
    } else {
      setMetadata(null);
      setError(null);
    }
  }, [url]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : url.trim() !== '' && !metadata ? (
        <div className='flex items-center my-4 space-x-6'>
          <Skeleton className="w-72 h-32" />
          <div className='w-full space-y-1.5'>
            <Skeleton className='h-6 w-full mb-3' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
          </div>
        </div>
      ) : (
        <div>
          {metadata ? (
            <div className='flex items-center my-4 space-x-6'>
              {metadata.ogImage ? (
                  <Link href={metadata.url}>
                    <Image src={metadata.ogImage} alt="thumbnail image of the accomodation" width={400} height={400} className='object-cover object-center w-full h-full aspect-[4/3]' />
                  </Link>
              ) : null}
            <div>
                <Link href={metadata.url} className='hover:underline decoration-2'>
                    <h3 className='font-semibold mb-2 line-clamp-2'>{metadata.title}</h3>
                </Link>
                <p className='line-clamp-3 text-muted-foreground'>{metadata.description}</p>
            </div>
          </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Embed;