import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskToServer } from '../slice/taskListSlice'

const CreateTask = () => {
  const [formData,setFormData]= useState({
    title:"",
    description:""
  })
  const dispatch=useDispatch()

  const handleChange=(e)=>{
    const {name, value}=e.target;
    setFormData({...formData, id:Date.now(), [name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(addTaskToServer(formData))
  }
  return (
    <div>
      <h1>Create Task</h1>
      <form action="" onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder='task title'
        name='title'
        value={formData.title}
        onChange={handleChange} /> <br /><br />
        <input 
        type="text" 
        placeholder='enter Description'
        name='description'
        value={formData.description}
        onChange={handleChange}/> <br /><br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default CreateTask
