import './App.css'
import dogPaw from './assets/dogPaw.png'

import { Header } from './components/header'
import { Button } from './components/button'
import { Card } from './components/card'
import { Modal } from './components/modal'
import InputForm from './components/inputForm'

import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
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

            <InputForm label='Informe o data' type='date' {...register('date',
              {
                required: { value: true, message: "Campo obrigatório." },
                min: { value: 0, message: "Campo precisa ser maior que 0." }
              }
            )} errorMessage={errors.date?.message} />

            <InputForm label='Quantos cães pequenos?' type='number' placeholder='cães pequenos...' {...register('numberOfLittleDogs',
              {
                required: { value: true, message: "Campo obrigatório." },
                min: { value: 0, message: "Campo precisa ser maior que 0." }
              }
            )} errorMessage={errors.numberOfLittleDogs?.message} />

            <InputForm label='Quantos cães grandes?' type='number' placeholder='cães grandes...' {...register('numberOfLargeDogs',
              {
                required: { value: true, message: "Campo obrigatório." },
                min: { value: 0, message: "Campo precisa ser maior que 0." }
              }
            )} errorMessage={errors.numberOfLargeDogs?.message} />


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
