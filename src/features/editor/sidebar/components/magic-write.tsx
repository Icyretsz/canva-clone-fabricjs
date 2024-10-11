'use client'
import React, {useEffect, useState} from 'react';

import {Check, ChevronsUpDown, Loader2} from "lucide-react"
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
import {Editor} from "@/features/editor/sidebar/types";
import splitString from "@/utils/splitString";
import {motion} from 'framer-motion'
import { Textarea } from "@/components/ui/textarea"
import {client} from '@/app/api/[[...route]]/hono'

const frameworks = [
    {
        value: "Default",
        label: "Default (GPT-4o-mini)",
    },
    {
        value: "Casual",
        label: "Casual (GPT-4o-mini)",
    },
    {
        value: "Funny",
        label: "Funny (GPT-4o-mini)",
    },
    {
        value: "Spelling",
        label: "Fix spelling (GPT-4o-mini)",
    }]

const charVariants = {
    hidden: {opacity: 0},
    reveal: {opacity: 1},
}

interface MagicWriteProps {
    editor: Editor | undefined
}


const MagicWrite = ({editor}: MagicWriteProps) => {

    const [textContent, setTextContent] = useState<string>('')
    const [AIResponse, setAIResponse] = useState<string>('')
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("Default")
    const [isLoading, setIsLoading] = React.useState(false)
    const [splitted, setSplitted] = React.useState<string[]>([])

    const saveText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(e.currentTarget.value)
    }

    const addMagicText = () => {
        editor?.addTextbox("content", AIResponse)
    }

    const callOpenAI = async () => {
        if (textContent === '') {
            return;
        }

        if (AIResponse !== '') {
            setAIResponse('')
        }

        setIsLoading(true)

        try {
            let response

            switch (value) {
                case 'Default':
                    response = await client.api.magic_write.default.$post({
                        json: { textContent }
                    })
                    break
                case 'Casual':
                    response = await client.api.magic_write.casual.$post({
                        json: { textContent }
                    })
                    break
                case 'Funny':
                    response = await client.api.magic_write.funny.$post({
                        json: { textContent }
                    })
                    break
                case 'Spelling':
                    response = await client.api.magic_write.spelling.$post({
                        json: { textContent }
                    })
                    break
                default:
                    response = await client.api.magic_write.default.$post({
                        json: { textContent }
                    })
                    break;
            }

            const responseJSON = await response.json();

            if (response.ok && 'AIResponse' in responseJSON) {
                setAIResponse(responseJSON.AIResponse);
            } else if (!response.ok && 'error' in responseJSON) {
                console.error('Failed to retrieve response:', responseJSON.error, response.statusText);
            }
        } catch (error) {
            console.error('Error while calling the API:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        setSplitted(splitString(AIResponse))
    }, [AIResponse])

    return (
        <div className='flex flex-col gap-5'>
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
            <div className="grid w-full gap-1.5">
                <Textarea placeholder="Enter your prompt..." id="message-2" onChange={(e) => saveText(e)}/>
            </div>
            {AIResponse !== '' ? <Button onClick={callOpenAI}>{isLoading ?
                    <div className='flex justify-center'><Loader2
                        className="animate-spin text-muted-foreground"/> Generating...</div> : 'Re-generating'}</Button> :
                <Button onClick={callOpenAI}>{isLoading ? <div className='flex justify-center'><Loader2
                    className="animate-spin text-muted-foreground"/> Generating...</div> : 'Generate'}</Button>}
            {AIResponse !== "" && splitted.length > 0 && <>
                <motion.p initial="hidden" whileInView="reveal" transition={{staggerChildren: .02}}>
                    {splitted.map((char, index) => (
                        <motion.span key={index} transition={{duration: .1}} variants={charVariants}>
                            {char}
                        </motion.span>
                    ))}
                </motion.p>
                <Button onClick={addMagicText}>Add text</Button></>
            }
        </div>
    );
};

export default MagicWrite;