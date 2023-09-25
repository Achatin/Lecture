"use client"

import { FC, useState } from 'react'
import Image from 'next/image'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Eye, ChevronsUpDown, Check, Currency, CalendarIcon, Search } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { Checkbox } from './ui/checkbox'
import AddableFields from './trip-form/AddableFields'
import FormElement from './FormElement'
import { Textarea } from './ui/textarea'
import Rating from './trip-form/Rating'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import { postTripValidator } from '@/lib/validations/trip'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import currencies from '../../datasets/currencies.json'
import countries from '../../datasets/countries.json'
import { Session } from 'next-auth'
import ButtonLoading from './ui/buttonLoading'
import ImageSelector from './trip-form/ImageSelector'
import AccomodationCard from './trip-form/AccomodationCard'
import { ScrollArea } from './ui/scroll-area'


interface CreateTripFormProps {
    session: Session,
}

const CreateTripForm: FC<CreateTripFormProps> = ({session}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [search4Image, setSearch4Image] = useState(false);
    const [nightstay, setNightstay] = useState(false);
      
    
    const form = useForm<z.infer<typeof postTripValidator>>({
        resolver: zodResolver(postTripValidator),
    });

    const transport = form.watch('transport');
    const destLocation = form.watch('destination_location');
    const rating = form.watch('rating');
    const date = form.watch('travel_date');
    const accomodation = form.watch('accommodation');

    async function onSubmit(values: z.infer<typeof postTripValidator>) {
        setIsLoading(true);

        const tripId = nanoid();
        const { user } = session;
        
        try {
            const postData = { ...values };
            postData.id = tripId;
            postData.author = user;
            await axios.post('/api/trip/post', postData);
            
            router.push(`/trip/${tripId}`);
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
                <h3 className='text-lg font-semibold mb-3'>Where did you travel?</h3>

                <div className='relative grid grid-cols-2 space-x-4'>
                    <FormField
                    control={form.control}
                    name="destination_country"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-[200px] justify-between",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value
                                    ? countries.find(
                                        (country) => country.name === field.value
                                    )?.name
                                    : "Select country"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search for country..." />
                                <CommandEmpty>No country found.</CommandEmpty>
                                <ScrollArea className='h-[200px]'>                                        
                                <CommandGroup className='overflow-y-scroll'>
                                {countries.map((country) => (
                                    <CommandItem
                                    value={country.name}
                                    key={country.code}
                                    onSelect={() => {
                                        form.setValue("destination_country", country.name)
                                    }}
                                    >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        country.name === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                    />
                                    {country.name}
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                                </ScrollArea>
                            </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />


                    <FormField control={form.control} name="destination_location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="City, town, location..." {...field} value={field?.value || ''} onChange={(e) => {setSearch4Image(false); field.onChange(e);}} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                {destLocation && search4Image ? (
                    <FormElement form={form} name="image" label='Image that best depicts your experience' className={`${form.getValues('destination_location') ? 'animate-in fade-in' : 'hidden' }`}>
                        <ImageSelector keyword={destLocation} onSelectImage={(imageUrl) => form.setValue('image', imageUrl)} />
                    </FormElement>
                ) : (
                    <div>
                        <FormLabel>Picture</FormLabel>
                        <p>Search for images on 
                            <Button type='button' variant='link' onClick={() => setSearch4Image(true)}>Unsplash 
                                <Image src="/images/unsplash.svg" alt="Unsplash logo icon" width={18} height={18} className="ml-2" />
                            </Button>
                        </p>
                    </div>
                )}

                <FormElement form={form} name="rating" label='Overall rating' className={`${form.getValues('destination_location') && search4Image ? 'animate-in fade-in' : 'hidden' }`}>
                    <Rating onRatingSelect={(rating) => form.setValue('rating', rating)}/>
                </FormElement>

                <FormElement form={form} name="places_2_visit" label='Places to visit' className={`${form.getValues('destination_location') && search4Image ? 'animate-in fade-in' : 'hidden' }`}>
                    <AddableFields placeholder='Grand Canyon' maxlength={60} onFieldChange={(field) => form.setValue('places_2_visit', field)} />
                </FormElement>

                <FormElement form={form} name="tips" label='Helpful tips' className={`${form.getValues('destination_location') && search4Image ? 'animate-in fade-in' : 'hidden' }`}>
                    <AddableFields placeholder='You should know that...' maxlength={300} onFieldChange={(field) => form.setValue('tips', field)} />
                </FormElement>

                <FormElement form={form} name="description" label='Describe your experience' className={`${form.getValues('destination_location') && search4Image ? 'animate-in fade-in' : 'hidden' }`}>
                    <Textarea placeholder='Anything else you would like to mention...' maxLength={2000} />
                </FormElement>


                <h3 className={`${rating ? 'text-primary' : 'text-muted-foreground' } text-lg font-semibold pt-3`}>How did you get there?</h3>
                <div className={`space-y-4 ${form.getValues('rating') ? 'animate-in fade-in' : 'hidden' }`}>

                    <div className='relative grid grid-cols-2 space-x-4'>
                        <FormField
                        control={form.control}
                        name="start_country"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Travelling from?</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value
                                        ? countries.find(
                                            (country) => country.name === field.value
                                        )?.name
                                        : "Select country"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search for country..." />
                                    <CommandEmpty>No country found.</CommandEmpty>
                                    <ScrollArea className='h-[200px]'>                                        
                                    <CommandGroup className='overflow-y-scroll'>
                                    {countries.map((country) => (
                                        <CommandItem
                                        value={country.name}
                                        key={country.code}
                                        onSelect={() => {
                                            form.setValue("start_country", country.name)
                                        }}
                                        >
                                        <Check
                                            className={cn(
                                            "mr-2 h-4 w-4",
                                            country.name === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                        />
                                        {country.name}
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                    </ScrollArea>
                                </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField control={form.control} name="start_location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder="City, town, location..." {...field} value={field?.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                    control={form.control}
                    name="transport"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Transport</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a means of transport" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="ferry">Ferry</SelectItem>
                            <SelectItem value="foot">Foot</SelectItem>
                            <SelectItem value="hitchhiking">Hitchhiking</SelectItem>
                            <SelectItem value="plane">Plane</SelectItem>
                            <SelectItem value="combined">Combined</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    { ["bus", "plane", "ferry"].includes(transport) ? (
                        <FormElement form={form} name="travelling_agency" label='Travelling agency'>
                            <Input type="text" placeholder="Airline company, bus name, ..." />
                        </FormElement>
                    ) : (
                        null
                    )}

                    <div>
                        <FormLabel>Duration</FormLabel>
                        <div className='flex space-x-4 mb-2'>

                            <FormField control={form.control} name="days"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='number' defaultValue={0} {...field} onChange={(e) => {form.setValue('duration', {...form.getValues('duration'), days: parseInt(e.target.value, 10)}); field.onChange(e);}} />
                                    </FormControl>
                                    <FormDescription>Days</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                            <FormField control={form.control} name="hours"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='number' defaultValue={0} {...field} onChange={(e) => {form.setValue('duration', {...form.getValues('duration'), hours: parseInt(e.target.value, 10)}); field.onChange(e);}} />
                                    </FormControl>
                                    <FormDescription>Hours</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                            <FormField control={form.control} name="minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='number' defaultValue={0} {...field} onChange={(e) => {form.setValue('duration', {...form.getValues('duration'), minutes: parseInt(e.target.value, 10)}); field.onChange(e);}} />
                                    </FormControl>
                                    <FormDescription>Minutes</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                        </div>
                    </div>

                    <div className='flex space-x-2'>
                        <FormElement form={form} name="price" label='Price'>
                            <Input type="number" defaultValue={0} />
                        </FormElement>

                        <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                            <FormItem className='mt-8'>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value
                                        ? currencies.find(
                                            (currency) => currency.name === field.value
                                        )?.name
                                        : "EUR"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search for currency..." />
                                    <CommandEmpty>No currency found.</CommandEmpty>
                                    <ScrollArea className='h-[200px]'>                                        
                                    <CommandGroup defaultValue={currencies[0].cc} className='overflow-y-scroll'>
                                    {currencies.map((currency) => (
                                        <CommandItem
                                        value={`${currency.symbol} (${currency.cc})`}
                                        key={currency.cc}
                                        onSelect={() => {
                                            form.setValue("currency", currency.cc)
                                        }}
                                        >
                                        <Check
                                            className={cn(
                                            "mr-2 h-4 w-4",
                                            currency.cc === field.cc
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                        />
                                        {currency.symbol} ({currency.cc})
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                    </ScrollArea>
                                </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <FormField
                    control={form.control}
                    name="travel_date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col my-2">
                        <FormLabel>When did you travel there?</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className={`flex flex-row items-center space-x-3 space-y-0 pt-3 pb-1 ${date ? 'animate-in fade-in' : 'hidden'}`}>
                    <Checkbox onCheckedChange={() => setNightstay(!nightstay)} />
                    <div className="space-y-1 leading-none">
                        <FormLabel>I stayed there for a night/s</FormLabel>
                    </div>
                </div>

                {nightstay ? (
                    <AccomodationCard form={form} onAccomodationData={(data) => form.setValue('accommodation', data)} />
                ) : null}

                <div className='flex space-x-4 py-4'>
                    {isLoading ? (
                        <ButtonLoading className='grow'>Posting...</ButtonLoading>
                    ) : (
                        <Button type="submit" className='font-bold grow'>
                            <Send className='w-4 h-4 mx-2' />
                            Post trip
                        </Button>
                    )}
                    
                    <Button type="button" variant="outline" className='grow'>
                        <Eye className='w-4 h-4 mx-2' />
                        Preview
                    </Button>
                </div>

            </form>
        </Form>
      )
}

export default CreateTripForm