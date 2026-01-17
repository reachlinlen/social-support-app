import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { PersonalInfoForm } from './app/PersonalInfo'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PersonalInfoForm />} />
        <Route path="/personalinfo" element={<PersonalInfoForm />} />
      </>
    )
  )
  return <RouterProvider router={router} />
}

export default App
