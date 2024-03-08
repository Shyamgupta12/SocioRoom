import React from 'react'
import Template from '../components/Template'


const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
    title="Join the millions learning to code with studynotion for free"
    desc1="Build skills for today,tomorow,and beyond."
    desc2="Education to future-proof your career."
    // image={SignupImg}
    formtype="signup"
    setIsLoggedIn = {setIsLoggedIn}
    />
  )
}

export default Signup
