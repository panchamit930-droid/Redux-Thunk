import Navbar from "./components/Navbar"
import { Routes,Route } from "react-router-dom"
import Tasks from "./pages/Tasks"
import CreateTask from "./pages/CreateTask"



function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Tasks/>}/>
        <Route path="/createtask" element={<CreateTask/>}/>
      </Routes>
    </>
  )
}

export default App
