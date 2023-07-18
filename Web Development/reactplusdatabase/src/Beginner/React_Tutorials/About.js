import React from 'react'
import Welcome from './Welcome'

function AboutPage() {
    const user = {
        imageUrl: 'https://empirical-software.engineering/assets/images/developer.png'
    };
    return (
      <>
        <h1>About</h1>
        <p>Hello there.<br />How do you do?</p>
        <img
            className="avatar"
            src={user.imageUrl}
            alt="User Avatar"
            style = {{
                width:160,
                height:115
            }}
        />
        <Welcome />
      </>
    );
}
export default AboutPage