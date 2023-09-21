import { FC, useState } from 'react'
import Embed from '../Embed';
import FormElement from '../FormElement';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import Rating from './Rating';

interface AccomodationCardProps {
    form
}

const AccomodationCard: FC<AccomodationCardProps> = ({form}) => {
  const [url, setUrl] = useState<string>('');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setUrl(value);
  }

  return (
    <Card className="w-full">
        <CardContent className='mt-6'>
          <div className="grid w-full items-center gap-4">

            <Input type="url" placeholder='Link the accomodation' onChange={handleInputChange} />

            <Embed url={url} />

            <FormElement form={form} name="accomodation_rating" label='Rating'>
                <Rating></Rating>
            </FormElement>

          </div>
      </CardContent>
    </Card>
  );
}

export default AccomodationCard