import { cn } from '@/lib/utils';
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card';
import { FormDescription, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import EmbedAccomodation from './EmbedAccommodation';
import Rating from './Rating';

interface AccomodationCardProps {
    form,
    className?: string,
}

const AccomodationCard: FC<AccomodationCardProps> = ({ form, className }) => {
  const [url, setUrl] = useState<string>('');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setUrl(value);
  }

  return (
    <Card className={cn('w-full', className)}>
        <CardContent className='mt-6'>
          <div className="grid w-full items-center gap-2">

            <div>
              <Input type="url" placeholder='Paste the URL of the accommodation' onChange={handleInputChange} />
              <FormDescription className='mt-2'>Embed with information will be generated</FormDescription>
            </div>

            <EmbedAccomodation url={url} onData={(data) => form.setValue('accommodation', {...form.getValues('accommodation'), title: data.title, description: data.description, image: data.image, url: data.url})} />

            <Rating onRatingSelect={(rating) => form.setValue('accommodation', {...form.getValues('accommodation'), rating: rating})} />
          </div>
      </CardContent>
    </Card>
  );
}

export default AccomodationCard