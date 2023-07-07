import React from "react";

export default function Top(){
    const user = {
        imageURL : "https://th.bing.com/th/id/OIP.GuFupnrDigtPpEJj7JqngAHaFO?pid=ImgDet&rs=1"
    }
    return(
        <div style={{
            display:"flex",
            alignItems:"center",
        }}>
            <img src = {user.imageURL} style={{width:135, height:100}}></img>
            <div style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
            <input type="text" name="query" placeholder="Search..." 
            style={{
                width:'95%',
                height:30,
                border:'2 solid black',
                borderRadius:50,
            }}
            />
            </div>
            <div>
            <ul
            style={{
                display:"flex",
                justifyContent: "space-around",
                listStyleType:"none",
                fontSize:20, 
                height:40,
                padding:0,
                margin:0
            }}>
                <li style={{ margin: "0 10px", padding:5 }}>Learn</li>
                <li style={{ margin: "0 10px", padding:5 }}>Reference</li>
                <li style={{ margin: "0 10px", padding:5 }}>Community</li>
                <li style={{ margin: "0 10px", padding:5 }}>Blog</li>
            </ul>
            </div>
            
        </div>
    )
}