import { Route, Routes } from 'react-router-dom'
import { routes } from './index'

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  )
}

export default AppRouter;
