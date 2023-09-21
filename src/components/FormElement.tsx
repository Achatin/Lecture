import { FC, cloneElement } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

interface FormElementProps {
  form: UseFormReturn,
  name: string,
  label?: string,
  description?: string,
  className?: string,
}

const FormElement: FC<FormElementProps> = ({ children, form, name, label, description, className }) => {
  return <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
          <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {cloneElement(children, { ...field })}
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
          </FormItem>
      )}
      />
}

export default FormElement