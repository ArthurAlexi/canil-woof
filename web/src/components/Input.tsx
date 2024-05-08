import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<'input'>{

}

function Input({...props} : InputProps, ref: LegacyRef<HTMLInputElement>){
    return (
        <input className="px-3 py-2 rounded-sm bg-transparent text-color border border-slate-500 outline-none"  ref={ref}{...props} />
    )
}

export default forwardRef(Input)