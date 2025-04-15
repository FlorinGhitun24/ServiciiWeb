
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import ListStudentComponent from './components/ListStudentComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentComponent from './components/StudentComponent'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <HeaderComponent></HeaderComponent>
      <Routes>
        {/* // http:localhost:3000 */}
        <Route path='/' element = { <ListStudentComponent></ListStudentComponent>}></Route>
        {/* // http:localhost:3000/student */}
        <Route path='/student' element = {<ListStudentComponent></ListStudentComponent>}></Route>
        {/* // http:localhost:3000/add-student */}
        <Route path='/add-student' element = {<StudentComponent></StudentComponent>}></Route>

        {/* // http:localhost:3000/edit-student/1 */}
        <Route path='/edit-student/:id' element = {<StudentComponent></StudentComponent>}></Route>
      </Routes>
      
    </BrowserRouter>
      

    </>
  )
}
export default App
