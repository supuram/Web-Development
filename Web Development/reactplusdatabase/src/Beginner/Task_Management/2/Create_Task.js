import React, { useState } from 'react'
import Axios from 'axios'
Axios.defaults.baseURL='http://localhost:5000'

export default function Create_Task(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [priority, setPriority] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('/submitTask', {name,description, date, priority})
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter the name of the Employee</label>
                <input type="name" value={name} onChange={event => {
                    setName(event.target.value)
                }}></input>
                <label>Describe the Task</label>
                <input type="description" value={description} onChange={event => {
                    setDescription(event.target.value)
                }}></input>
                <label>What is the due date</label>
                <input type="date" value={date} onChange={event => {
                    setDate(event.target.value)
                }}></input>
                <label>Set the Priority</label>
                <input type="priority" value={priority} onChange={event => {
                    setPriority(event.target.value)
                }}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}