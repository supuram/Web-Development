import React, { useState } from "react";

export default function Login_Page(){
   

    return(
        <div>
            <form>
                <input 
                    type="email" 
                    placeholder="Email">
                </input>
                <input 
                    type="password" 
                    placeholder="Password">
                </input>
                <button>Submit</button>
            </form>
        </div>
    )
}