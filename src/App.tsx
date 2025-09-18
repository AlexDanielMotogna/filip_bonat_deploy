import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/scss/main.scss'

import { Suspense } from 'react'
import AppProviders from './components/wrappers/AppProviders'
import AppRouter from './routes/router'
import Loader from './components/Loader'
import './i18n'


function App() {
  return (
    <>
      <AppProviders>
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </AppProviders>
    </>
  )
}

export default App
