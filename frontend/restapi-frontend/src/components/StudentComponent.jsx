import React, { useEffect, useState } from 'react'
import { createStudent, getStudent, updateStudent } from '../services/StudentService'
import { useNavigate, useParams } from 'react-router-dom'

const StudentComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams()

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigator = useNavigate()

    useEffect(() => {
        if(id){
            getStudent(id).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error => {
                console.error(error)
            })
        }

    }, [id])

    
    

    function saveOrUpdateStudent(e){
        e.preventDefault()

        if(validateForm()){
            const student = {firstName, lastName, email}
            console.log(student)

            if(id){
                updateStudent(id, student).then((response) => {
                    console.log(response.data)
                    navigator('/student')
                }).catch(error => {
                    console.error(error)
                })
            } else{
                createStudent(student).then((response) => {
                    console.log(response.data)
                    navigator('/student')
                }).catch(error => {
                    console.error(error)
                })
            }
            
            
        }
    

        
    }

    function validateForm(){
        let valid = true

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = ''
        } else {
            errorsCopy.firstName = 'First name is required'
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = ''
        } else {
            errorsCopy.lastName = 'Last name is required'
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = ''
        } else {
            errorsCopy.email = 'Email is required'
            valid = false;
        }
        
        setErrors(errorsCopy)

        return valid
    }

    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Student</h2>
        } else{
            return <h2 className="text-center">Add Student</h2>
        }
    }
  return (
    <div className="container">
        <div className="row">
            <div className="card">
                {
                    pageTitle()
                }
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label className="form-label">First Name:</label>
                            <input 
                                type='text' 
                                placeholder='Enter Student First Name' 
                                name='firstName' 
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
                                onChange={(e) => setFirstName(e.target.value)}>
                            </input>
                            { errors.firstName && <div className='invalid-feedback'> { errors.firstName} </div> }
                        </div>
                    
                        <div className="form-group mb-2">
                            <label className="form-label">Last Name:</label>
                            <input 
                                type='text' 
                                placeholder='Enter Student Last Name' 
                                name='lastName' 
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid': '' }`}
                                onChange={(e) => setLastName(e.target.value)}>
                            </input>
                            { errors.lastName && <div className='invalid-feedback'> { errors.lastName} </div> }
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Email:</label>
                            <input 
                                type='text' 
                                placeholder='Enter Student Email' 
                                name='email' 
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid': '' }`}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                            { errors.email && <div className='invalid-feedback'> { errors.email} </div> }
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateStudent}>Submit</button>
                    </form>

                </div>
            </div>

        </div>

    </div>
  )
}

export default StudentComponent