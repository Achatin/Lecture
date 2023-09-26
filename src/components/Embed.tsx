import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'

interface EmbedProps {
  data: {
    image: string,
    title: string,
    description: string,
    url: string,
  },
  titleLength?: number,
  descriptionLength?: number,
}

const Embed: FC<EmbedProps> = ({data, titleLength = 2, descriptionLength = 2}) => {
  return <div className='flex items-center my-4 space-x-6'>
        {data.image ? (
            <Link href={data.url}>
                <Image src={data.image} alt="thumbnail image of the accomodation" width={400} height={400} className='object-cover object-center w-full h-full aspect-[4/3]' />
            </Link>
        ) : null}
        <div>
            <Link href={data.url} className='hover:underline decoration-2'>
                <h3 className={`font-semibold mb-2 line-clamp-${titleLength.toString()}`}>{data.title}</h3>
            </Link>
            <p className={`line-clamp-${descriptionLength.toString()} text-muted-foreground`}>{data.description}</p>
        </div>
    </div>
}

export default Embed