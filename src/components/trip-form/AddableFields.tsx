import { Trash2 } from 'lucide-react';
import { FC, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface AddableFieldsProps {
    placeholder?: string,
    maxlength?: number,
    onFieldChange: (field: string[]) => void,
}

const AddableFields: FC<AddableFieldsProps> = ({ placeholder, maxlength = 64, onFieldChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [savedValues, setSavedValues] = useState<string[]>([]);

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleAddClick = () => {
        if (inputValue.trim() !== '') {
            setSavedValues([...savedValues, inputValue]);
            onFieldChange([...savedValues, inputValue]);
            setInputValue(''); // Clear the input field after saving
        }
    };

    const handleDeleteClick = (index: number) => {
        const newSavedValues = [...savedValues];
        newSavedValues.splice(index, 1);
        setSavedValues(newSavedValues);
        onFieldChange(newSavedValues);
      };

    return (
        <div>
            {savedValues.map((value, index) => (
                <div key={index} className="relative my-2">
                    <p className='flex w-full rounded-md border border-input bg-background px-3 pr-12 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>{ value }</p>
                    <Button type="button" variant="ghost" onClick={() => handleDeleteClick(index)} className='absolute right-0 top-0'><Trash2 className='w-4 h-4 text-red-500' /></Button>
                </div>
            ))}
            <div className='flex space-x-2'>
                <Input type="text" value={inputValue} maxLength={maxlength} onChange={handleInputChange} placeholder={placeholder} />
                <Button type='button' onClick={handleAddClick} className='text-xl font-bold'>+</Button>
            </div>
        </div>
    )
}

export default AddableFields