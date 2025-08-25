import React from 'react'
import { createRoot } from 'react-dom/client'
import ElectronicLife from './ElectronicLife'
import WorldProvider from '@/context'
import '@/styles/index.css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('no root element found')
}
const root = createRoot(rootEl)
root.render(
  <WorldProvider>
    <ElectronicLife />
  </WorldProvider>
)
