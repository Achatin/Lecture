import { cn } from '@/lib/utils';
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form';
import Embed from '../Embed';
import FormElement from '../FormElement';
import { Card, CardContent } from '../ui/card';
import { FormDescription, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import Rating from './Rating';

type EmbedData = {
  url?: string;
  image?: string;
  title?: string;
  description?: string;
};

type AccomodationData = {
  url?: string;
  image?: string;
  title?: string;
  description?: string;
  rating?: number;
}

interface AccomodationCardProps {
    form,
    className: string,
    onAccomodationData: (data: AccomodationData) => void,
}

const AccomodationCard: FC<AccomodationCardProps> = ({ form, className, onAccomodationData }) => {
  const [url, setUrl] = useState<string>('');
  const [accomodationData, setAccomodationData] = useState<AccomodationData>();

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setUrl(value);
  }

  const handleEmbedData = (data: EmbedData) => {
    setAccomodationData({...accomodationData, ...data});
    onAccomodationData({...accomodationData});
  }

  return (
    <Card className={cn('w-full', className)}>
        <CardContent className='mt-6'>
          <div className="grid w-full items-center gap-2">

            <div>
              <Input type="url" placeholder='Paste the URL of the accomodation' onChange={handleInputChange} />
              <FormDescription className='mt-2'>Embed with information will be generated</FormDescription>
            </div>

            <Embed url={url} onData={handleEmbedData} />

            <FormElement form={form} name="accomodation_rating" label='Rating'>
                <Rating onRatingSelect={(rating) => {setAccomodationData({...accomodationData, rating: rating}); onAccomodationData({...accomodationData, rating: rating})}} />
            </FormElement>
          </div>
      </CardContent>
    </Card>
  );
}

export default AccomodationCard