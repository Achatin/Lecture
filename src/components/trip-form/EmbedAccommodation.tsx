"use client"

import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Embed from '../Embed';
import { Skeleton } from '../ui/skeleton';

interface EmbedAccomodationProps {
  url: string,
  onData: (data: {
    url: string;
    image: string;
    title: string;
    description: string;
  }) => void;
}

const EmbedAccomodation: FC<EmbedAccomodationProps> = ({ url, onData }) => {
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
            onData({
              url: metadata.url,
              image: metadata.ogImage,
              title: metadata.title,
              description: metadata.description,
            });
            setError(null);
          }
        } catch (e: Error) {
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
            <Embed data={{
              url: metadata.url,
              image: metadata.ogImage,
              title: metadata.title,
              description: metadata.description,
            }} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default EmbedAccomodation;