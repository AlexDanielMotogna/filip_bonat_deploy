import { lazy } from 'react'
import { type RouteProps } from 'react-router-dom'

const HomePage = lazy(() => import('@/pages/HomePage/page'))
const PrivatPage = lazy(() => import('@/pages/PrivatPage/page'))
const FirmaPage = lazy(() => import('@/pages/FirmaPage/page'))
const DatenschutzPage = lazy(() => import('@/pages/DatenschutzPage/page'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

export const routes: RoutesProps[] = [
  {
    path: '/',
    name: 'Index',
    element: <HomePage />,
  },
  {
    path: '/privat',
    name: 'Privat',
    element: <PrivatPage />,
  },
  {
    path: '/firma',
    name: 'Firma',
    element: <FirmaPage />,
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    element: <DatenschutzPage />,
  }
]
