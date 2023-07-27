import React, { useState } from 'react'
import './Ad.css'
import Axios from "axios";

export default function App(){
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [religion, setReligion] = useState('')
    const [date, setDate] = useState('')
    const [salary, setSalary] = useState('')
    const [job, setJob] = useState('')
    const [MorF, setMorF] = useState('')
    const [status, setStatus] = useState('')
    const [want, setWant] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('/giveinfo', {name, country, religion, date, salary, job, MorF, status, want, phone, email})
        .then((response) => {
            // Handle successful form submission
            console.log(response.data.message); // or show a success message to the user
            setName('')
            setCountry('')
            setReligion('')
            setDate('')
            setSalary('')
            setJob('')
            setMorF('def')
            setStatus('def')
            setWant('def')
            setPhone('')
            setEmail('')
        })
        .catch((error) => {
            // Handle form submission error
            console.error('Error submitting the form:', error);
            // Show an error message to the user if needed
        });
    }
    return(
        <div className='divAd'>
            <form className='formAd' onSubmit={handleSubmit}>
                <input
                    id="name"
                    className="inputAd"
                    required
                    type='name'
                    value={name}
                    placeholder='Enter Your Full Name'
                    onChange={event => {
                        setName(event.target.value)
                }}></input>
                <input
                    id="country"
                    className="inputAd"
                    required
                    type='country'
                    value={country}
                     placeholder='Enter Your Country'
                    onChange={event => {
                        setCountry(event.target.value)
                }}></input>
                <input
                    id="religion"
                    className="inputAd"
                    required
                    type='religion'
                    value={religion}
                    placeholder='Enter Your Religion'
                    onChange={event => {
                        setReligion(event.target.value)
                }}></input>
                <label className='labelAd'>Date of Birth</label>
                <input
                    id="dob"
                    className="inputAd"
                    required
                    type='date'
                    value={date}
                    placeholder='Date of Birth'
                    onChange={event => {
                        setDate(event.target.value)
                }}></input>
                <input
                    id="number"
                    className="inputAd"
                    required
                    type='number'
                    value={salary}
                    placeholder='Enter Your Salary'
                    onChange={event => {
                        setSalary(event.target.value)
                }}></input>
                <input
                    id="job"
                    className="inputAd"
                    required
                    type='job'
                    value={job}
                    placeholder='Enter Your Job Title'
                    onChange={event => {
                        setJob(event.target.value)
                }}></input>
                <select value={MorF} onChange={event => setMorF(event.target.value)} required 
                className='selectMFAd inputAd'>
                    <option className='optionMFAD' value='def'>Select</option>
                    <option className='optionMFAD' value="M">M</option> (the selected value will be stored in the MorF variable)
                    <option className='optionMFAD' value="F">F</option>
                </select>
                <select value={status} onChange={event => setStatus(event.target.value)} required className='selectstatusAd inputAd'>
                    <option className='optionstatusAd' value='def'>Select</option>
                    <option className='optionstatusAd'>Single, Never Married</option>
                    <option className='optionstatusAd'>Widow with nokids</option>
                    <option className='optionstatusAd'>Divorced with no kids</option>
                    <option className='optionstatusAd'>Widow with kids</option>
                    <option className='optionstatusAd'>Divorced with kids</option>
                </select>
                <select value={want} onChange={event => setWant(event.target.value)} required className='selectwantAd inputAd'>
                    <option className='optionwantAd' value='def'>Select</option>
                    <option className='optionwantAd'>Want to do job after marriage</option>
                    <option className='optionwantAd'>Want to be a housewife</option>
                    <option className='optionwantAd'>Want to be a househusband</option>
                </select>
                <input
                    id="phone"
                    className="inputAd"
                    required
                    type='phone'
                    value={phone}
                    placeholder='Phone Number'
                    onChange={event => {
                        setPhone(event.target.value)
                }}></input>
                <input
                    id="email"
                    className="inputAd"
                    required
                    type='email'
                    value={email}
                    placeholder='Email'
                    onChange={event => {
                        setEmail(event.target.value)
                }}></input>
                <button className='buttonAd inputAd'>Submit</button>
            </form>
        </div>
    )
}