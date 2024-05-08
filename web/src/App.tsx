import './App.css'
import logo from '../public/logo.png'
import { Button } from './components/Button'
import Input from './components/Input'
import { Header } from './components/header'

import { useForm, SubmitHandler } from "react-hook-form"
import { Modal } from './components/modal'
import { useState } from 'react'
import { choiceBestPetShop } from './services/choice-best-petStore'
import { RequestPetStore } from './models/RequestPetStore'
import { PetStore } from './models/PetStore'

type FormInputs = {
  date: string
  numberOfLittleDogs: number
  numberOfLargeDogs: number
}

function App() {

  const [showModal, setShowModal] = useState(false)
  const [petStore, setPetStore] = useState<PetStore | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormInputs>()
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    const body = {
      date: data.date,
      numberOfSmallDog: data.numberOfLittleDogs,
      numberOfLargeDog: data.numberOfLargeDogs
    } as RequestPetStore

    try {
      setPetStore(await choiceBestPetShop(body))
      setShowModal(true)
      reset()
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>
      <Header />
      <main className='w-full flex justify-center items-center p-3 mt-5'>
        <section className='w-[400px] p-5 rounded-md bg-slate-800'>
          <form className='flex flex-col gap-5 p-3' onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col">
              <label>Informe o data:</label>
              <Input type='date' {...register('date', { required: true, })} />
              {errors.date && <span className='text-red-600'>Campo obrigatório</span>}
            </div>

            <div className="flex flex-col">
              <label>Quantos cães pequenos?</label>
              <Input type="number" placeholder='cães pequenos...' inputMode="numeric" pattern="[0-9]*"  {...register('numberOfLittleDogs', { required: true, min: 0 })} />
              {errors.numberOfLittleDogs?.type === 'required' && <span className='text-red-600'>Campo obrigatório</span>}
              {errors.numberOfLittleDogs?.type === 'min' && <span className='text-red-600'>Campo tem que ser positivo</span>}
            </div>

            <div className="flex flex-col">
              <label>Quantos cães grandes?</label>
              <Input type="number" placeholder='cães grandes...' {...register('numberOfLargeDogs', { required: true, min: 0 })} />
              {errors.numberOfLargeDogs?.type === 'required' && <span className='text-red-600'>Campo obrigatório</span>}
              {errors.numberOfLargeDogs?.type === 'min' && <span className='text-red-600'>Campo tem que ser positivo</span>}
            </div>

            <Button type="submit"> Buscar </Button>
          </form>
        </section>

        {showModal &&
          <Modal>
            <div className="flex justify-center items-center">
              <img src={logo} alt='Canil WOOF' className='w-[50px] h-auto' />
              <h2 className='font-bold text-2xl'>Resultado</h2>
            </div>
            <div className='p-3 border rounded-md my-2'>
              <h2 className=' text-xl text-slate-900'>PetShop: <span className='font-semibold ml-4'>{petStore?.name}</span> </h2>
              <h2 className=' text-xl text-slate-900'>Distância: <span className='font-semibold ml-3'> {petStore?.distance} KM </span> do canil</h2>
              <h3 className=' text-xl text-slate-900'>Valor: <span className='font-semibold ml-12'> {petStore?.totalCost.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              })} </span></h3>
            </div>
            <Button onClick={() => setShowModal(false)}>Fechar</Button>
          </Modal>
        }

      </main>
    </>
  )
}

export default App
