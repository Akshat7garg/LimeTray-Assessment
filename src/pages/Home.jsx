import { Header } from '@/components/Header'
import { TaskInput } from '@/components/TaskInput'
import { TaskList } from '@/components/TaskList'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

export const Home = () => {

  useGSAP(() => {
    gsap.fromTo('#home', {
      opacity: 0
    }, {
      opacity: 1
    })
  })

  return (
    <main id='home' className='h-screen w-full text-lime-100'>
      <Header />
      <TaskInput />
      <TaskList />
    </main>
  )
}
