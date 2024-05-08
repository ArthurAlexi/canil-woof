import './App.css'
import dogPaw from './assets/dogPaw.png'
import dogPawTrail from './assets/dogPawTrail.png'

import { Button } from './components/button'
import Input from './components/input'
import { Header } from './components/header'
import { Card } from './components/card'
import { Modal } from './components/modal'

import { useForm, SubmitHandler } from "react-hook-form"
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

  function closeModal() {
    setShowModal(false)
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
            <img src={dogPaw} alt="dog paw" className='w-28  rotate-12 self-end' />
          </form>
        </section>

        {showModal &&
          <Modal>
            <Card petStore={petStore} action={closeModal} />
          </Modal>
        }


      </main>
    </>
  )
}

export default App
