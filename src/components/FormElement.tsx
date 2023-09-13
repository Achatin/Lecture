import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

interface FormElementProps {
  form: UseFormReturn,
  name: string,
  label?: string,
  description?: string,
}

const FormElement: FC<FormElementProps> = ({ children, form, name, label, description }) => {
  return <FormField
      control={form.control}
      name={name}
      render={({ }) => (
          <FormItem className='mb-5 mx-1'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
              {children }
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
          </FormItem>
      )}
      />
}

export default FormElement