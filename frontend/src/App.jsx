import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
      Student Managment System
    </h1>
    <Outlet/>
    </>
  )
}

export default App
