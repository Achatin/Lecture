"use client"

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Embed = () => {
  const [linkData, setLinkData] = useState(null);
  const [url, setUrl] = useState('');

  const handleFetchMetadata = async () => {
    try {
        const response = await axios.post('/api/scrape/', { url: url });
        const metadata = response.data;
        setLinkData(metadata);
    } catch (e) {
        console.error('Error fetching data:', e);
    }
    
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleFetchMetadata}>Fetch Metadata</button>
      {linkData ? (
        <div className='flex items-center my-4 space-x-6'>
            <Link href={linkData.url} className='w-full'>
                <Image src={linkData.ogImage} alt="thumbnail image of the accomodation" width={300} height={300} />
            </Link>
            <div>
                <Link href={linkData.url} className='hover:underline decoration-2'>
                    <h3 className='font-semibold mb-2'>{linkData.title}</h3>
                </Link>
                <p className='line-clamp-3 text-muted-foreground'>{linkData.description}</p>
            </div>
        </div>
      ) : null}
    </div>
  );
};

export default Embed;