import {ChatTeardropDots} from 'phosphor-react'
import { Popover } from '@headlessui/react'
import { WidgetForm } from './WidgetForm'
//import { useState } from 'react'


export function Widget(){
    /*
    --Com o headless não é necessário usar o state do react nem criar a função pra mudança do mesmo
    o controle passa a ser feito pelo próprio Popover no caso específico
    const [isWidgetOpen, setIsWidgetOpen] = useState(false)

    function toggleWidgetVisibility(){
        setIsWidgetOpen(!isWidgetOpen)
    }
    */
    return (
        <Popover className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
            <Popover.Panel>
                <WidgetForm/>            
            </Popover.Panel>      

            <Popover.Button className="flex items-center group bg-brand-500 rounded-full px-3 h-12 text-white"> 
                <ChatTeardropDots className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                    <span className="pl-2">
                        Feedback
                    </span>
                </span>
            </Popover.Button>
        </Popover>
    )
}