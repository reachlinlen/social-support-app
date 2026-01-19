import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// import { PersonalInfoForm } from './app/PersonalInfo'
import { SocialSecurityApplication } from './app/SocailSecurityApplication'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SocialSecurityApplication />} />
      </>
    )
  )
  return <RouterProvider router={router} />
}

export default App
