import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'>{

}

export function Button({...props} : ButtonProps){
    return (
        <button  {...props} className='p-2 bg-slate-700 uppercase rounded-sm hover:bg-slate-300 hover:text-slate-700 transition-colors' />
    )
}