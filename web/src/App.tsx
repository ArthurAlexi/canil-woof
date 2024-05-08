import './App.css'
import logo from '../public/logo.png'
import { Button } from './components/Button'
import Input from './components/Input'
import { Header } from './components/header'

import { useForm, SubmitHandler } from "react-hook-form"
import { Modal } from './components/modal'
import { useState } from 'react'

type FormInputs = {
  date: Date
  numberOfLargeDogs: number
  numberOfLittleDogs: number
}

function App() {


  const [showModal, setShowModal] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data)


  return (
    <>
      <Header />
      <main className='w-full flex justify-center items-center p-3 mt-5'>
        <section className='w-[400px] p-5 rounded-md bg-slate-800'>
          <form className='flex flex-col gap-5 p-3' onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col">
              <label>Informe o data:</label>
              <Input type='date' {...register('date', { required: true })} />
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
              <img src={logo} alt='Canil WOOF' className='w-[50px] h-auto'/>
              <h2 className='font-semibold'>A melhor opção para PetShop: </h2>
              <h3 className='font-semibold'>o valor total a se pagar é: </h3>
              <Button onClick={()=>setShowModal(false)}>Fechar</Button>
          </Modal>
        }

      </main>
    </>
  )
}

export default App
