import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from "react";
import Input from "./input";

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label: string
    error?: boolean;
    errorMessage?: string;
}

function InputForm({label, error, errorMessage,  ...props }: InputProps, ref: LegacyRef<HTMLInputElement>) {
    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <Input ref={ref} {...props} />
            {errorMessage && <span className='text-red-600'>{errorMessage}</span>}
        </div>
    )
}

export default forwardRef(InputForm)