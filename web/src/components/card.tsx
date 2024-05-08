import logo from '../../public/logo.png'
import { PetStore } from "../models/PetStore";
import { Button } from './button';

interface CardProps {
    petStore : PetStore | null
    action: () => void
}

export function Card({ petStore, action }: CardProps) {
    return (
        <>
            <div className="flex justify-center items-center">
                <img src={logo} alt='Canil WOOF' className='w-[50px] h-auto' />
                <h2 className='font-bold text-2xl'>Resultado</h2>
            </div>
            <div className='p-3 border rounded-md my-2'>
                <h2 className=' text-xl text-slate-900'>PetShop: <span className='font-semibold ml-4'>{petStore?.name}</span> </h2>
                <h2 className=' text-xl text-slate-900'>Distância: <span className='font-semibold ml-3'> {petStore?.distance} KM </span> </h2>
                <h3 className=' text-xl text-slate-900'>Valor: <span className='font-semibold ml-12'> {petStore?.totalCost.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })} </span></h3>
            </div>
            <Button onClick={action}>Fechar</Button>
        </>
    )
}