import { response } from 'express'
import User from './../model/User.js'
import bcrypt from 'bcrypt'

export const signup = async(req, res) => {
    let existingUser;
    try{
        existingUser = await User.findOne({email:req.body.email})
    }
    catch(err){
        console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:'User already exists'})
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        await user.save()
    }
    catch(err){
        console.log(err)
    }
    return res.status(201).json({message:user})
}

export const login = async(req, res) => {
    let existingUser;
    try{
        existingUser = await User.findOne({email:req.body.email})
    }
    catch(err){
        return new Error(err)
    }
    if(!existingUser){
        return res.status(400).json({message:'User not found. Signup Please'})
    }
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:'Invalid email/Password'})
    }
}

/**
*! Here what is user.save()?Where is it saving it ? what is  return res.status(201).json({message:user}) ? To whom is it returned ?
*? Ans)The `user.save()` method is a Mongoose method that saves the `user` document to the MongoDB database. It is an asynchronous method that returns a promise, which is why it is being used with the `await` keyword inside an `async` function. When the `save()` method is called, Mongoose will validate the document and attempt to save it to the database. If the save operation is successful, the promise returned by the `save()` method will be resolved. If there is an error, the promise will be rejected and the error will be caught in the `catch` block. 

*? The line `return res.status(201).json({message:user})` sends a response to the client with a status code of `201 Created` and a JSON object containing the saved user document. The `res.status(201)` method sets the HTTP status code of the response to `201 Created`, indicating that a new resource has been successfully created on the server. The `.json({message:user})` method sends a JSON response to the client with a `message` property containing the saved user document.

*? In summary, when a request is made to this route, a new user document is created using data from the request body and saved to the MongoDB database using the `user.save()` method. If the save operation is successful, a response is sent to the client with a status code of `201 Created` and a JSON object containing the saved user document.
*/