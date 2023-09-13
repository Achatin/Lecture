"use client"

import { FC, useEffect } from 'react'
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
import { Send, Eye, ChevronsUpDown, Check, Currency, CalendarIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

import currencies from '../../datasets/currencies.json'
import countries from '../../datasets/countries.json'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { Checkbox } from './ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import AddableFields from './AddableFields'
import FormElement from './FormElement'
import { Textarea } from './ui/textarea'
import Rating from './Rating'

const formSchema = z.object({
    destination_country: z.string({
        required_error: "Please select a country.",
    }),
    destination_city: z.string().min(1, {
        message: "City mustn't be empty."
    }),
    start_country: z.string({
        required_error: "Please select a country.",
    }),
    start_city: z.string().min(1, {
        message: "City mustn't be empty.",
    }),
    transport: z.string({
        required_error: "Please select a transport.",
    }),
})

interface CreateTripFormProps {
  
}

const CreateTripForm: FC<CreateTripFormProps> = ({}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const transport = form.watch('transport');
    const nightstay = form.watch('nightstay');

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <Accordion type="single" defaultValue="item-1" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className='text-lg font-semibold'>Where did you travel?</AccordionTrigger>
                    <AccordionContent>

                        <h4 className='text-lg font-semibold my-2'>From</h4>

                        <div className='grid grid-cols-2 gap-x-4'>
                            <FormField
                            control={form.control}
                            name="start_country"
                            render={({ field }) => (
                                <FormItem className="mb-4">
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
                                        <CommandInput placeholder="Search country..." />
                                        <CommandEmpty>No country found.</CommandEmpty>
                                        <CommandGroup>
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
                                    </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormElement form={form} name="start_city" label='Location'>
                                <Input type="text" placeholder="Name of the city or location..." />
                            </FormElement>
                        </div>

                        <Separator className="my-4" />
                        
                        <h4 className='text-lg font-semibold my-2'>To</h4>

                        <div className='grid grid-cols-2 gap-x-4'>
                            <FormField
                            control={form.control}
                            name="destination_country"
                            render={({ field }) => (
                                <FormItem className="mb-4">
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
                                        <CommandInput placeholder="Search country..." />
                                        <CommandEmpty>No country found.</CommandEmpty>
                                        <CommandGroup>
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
                                    </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormElement form={form} name="destination_city" label='Location'>
                                <Input type="text" placeholder="Name of the city or location..." />
                            </FormElement>
                        </div>

                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className='text-lg font-semibold'>How did you get there?</AccordionTrigger>
                    <AccordionContent>

                        <FormField
                        control={form.control}
                        name="transport"
                        render={({ field }) => (
                            <FormItem className='mb-4 mx-1'>
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

                        <FormLabel>Duration</FormLabel>
                        <div className='flex space-x-4 mb-2'>
                            <FormElement form={form} name="duration_days" description='Days'>
                                <Input type="number" defaultValue={0} />
                            </FormElement>

                            <FormElement form={form} name="duration_hours" description='Hours'>
                                <Input type="number" defaultValue={0} />
                            </FormElement>

                            <FormElement form={form} name="duration_minutes" description='Minutes'>
                                <Input type="number" defaultValue={0} />
                            </FormElement>
                        </div>

                        <div className='flex space-x-2'>
                            <FormElement form={form} name="price" label='Price'>
                                <Input type="number" defaultValue={0} />
                            </FormElement>

                            <FormField
                            control={form.control}
                            name="transport"
                            render={({ field }) => (
                                <FormItem className='mb-4 w-24'>
                                <FormLabel>‎ </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="EUR" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        { currencies.map((currency) => {
                                            return <SelectItem value={currency.cc}>{currency.cc} ({currency.symbol})</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
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

                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className='text-lg font-semibold'>Additional info</AccordionTrigger>
                    <AccordionContent>

                        <FormElement form={form} name="rating" label='Overall rating'>
                            <Rating></Rating>
                        </FormElement>

                        <FormElement form={form} name="places_2_visit" label='Places to visit'>
                            <AddableFields placeholder='Grand Canyon'></AddableFields>
                        </FormElement>

                        <FormElement form={form} name="tips" label='Helpful tips'>
                            <AddableFields placeholder='You should know that...' maxlength={128}></AddableFields>
                        </FormElement>

                        <FormElement form={form} name="photo" label='Upload a photo' description='A photo that depicts your travelling experience.'>
                            <Input type="file" accept="image/png, image/jpeg" />
                        </FormElement>

                        <FormElement form={form} name="description" label='Describe your experience'>
                            <Textarea placeholder='Anything else you would like to mention...' />
                        </FormElement>

                        <FormField
                        control={form.control}
                        name="nightstay"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-8 mb-4">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>I stayed there for a night/s</FormLabel>
                            </div>
                            </FormItem>
                        )}
                        />

                        { nightstay === true ? (
                            <Card className="w-full">
                                <CardHeader>
                                <CardTitle>Stay</CardTitle>
                                <CardDescription>Would you recommend this place as a shelter for future wanderers?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Name of your project" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">Framework</Label>
                                        <Select>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="next">Next.js</SelectItem>
                                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                            <SelectItem value="astro">Astro</SelectItem>
                                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>
                                    </div>
                                </form>
                                </CardContent>
                            </Card>
                        ) : (
                            null
                        )}

                    </AccordionContent>
                </AccordionItem>
            
                </Accordion>

                <div className='flex space-x-4 my-8'>
                    <Button type="submit" className='font-bold grow'>
                        <Send className='w-4 h-4 mx-2' />
                        Post trip
                    </Button>
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