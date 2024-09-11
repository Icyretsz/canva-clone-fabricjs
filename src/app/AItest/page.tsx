'use client'
import React, {useState} from 'react';

import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
    {
        value: "Default",
        label: "Default",
    },
    {
        value: "More casual",
        label: "More casual",
    },
    {
        value: "More fun",
        label: "More fun",
    },]

const tones = [
    {tone: 'Default', api: '/api/magic-write/default'},
    {tone: 'Casual', api: '/api/magic-write/casual'},
    {tone: 'Funny', api: '/api/magic-write/funny'}
]


const Page = () => {

    const [textContent, setTextContent] = useState<string>('')
    const [AIResponse, setAIResponse] = useState<string>('')
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("Default")
    const [toneAPI, setToneAPI] = React.useState<string>(tones[0].api)

    const saveText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(e.currentTarget.value)
    }

    const callOpenAI = async () => {
        if (textContent === '') {
            return;
        }

        switch(value) {
            case 'Default':
                setToneAPI(tones[0].api)
                break
            case 'Casual':
                setToneAPI(tones[1].api)
                break
            case 'Funny':
                setToneAPI(tones[2].api)
                break
            default:
                setToneAPI(tones[0].api);
                break;
        }

        try {
            const response = await fetch(`${toneAPI}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({textContent}),
            });

            const responseJSON = await response.json();

            if (response.ok) {
                setAIResponse(responseJSON.AIResponse);
                console.log(responseJSON);
            } else {
                console.error('Failed to retrieve response:', responseJSON.message || response.statusText);
            }
        } catch (error) {
            console.error('Error while calling the API:', error);
        }
    };

    return (
        <div className='flex flex-col gap-5'>
            <textarea onChange={(e) => saveText(e)} className='border border-black'/>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select tone..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search tone..."/>
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <button onClick={callOpenAI}>Submit</button>
            {AIResponse !== "" && <div>{AIResponse}</div>}
        </div>
    );
};

export default Page;