import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'>{

}

export function Input({...props} : InputProps){
    return (
        <input className="px-3 py-2 rounded-sm bg-transparent border border-slate-500 outline-none" {...props} />
    )
}