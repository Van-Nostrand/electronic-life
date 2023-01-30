import React from 'react'
import { createRoot } from 'react-dom/client'
import ElectronicLife from './ElectronicLife'
import WorldProvider from '@/context'
import '@/scss/main.scss'

const root = createRoot(document.getElementById('root'))
root.render(
  <WorldProvider>
    <ElectronicLife />
  </WorldProvider>
)
