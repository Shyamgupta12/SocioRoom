import React from 'react'
import Template from '../components/Template'


const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
    title="WellCome To SocioRoom"
    // desc1="Build skills for today,tomorow,and beyond."
    // desc2="Education to future-proof your career."
    // image={SignupImg}
    formtype="signup"
    setIsLoggedIn = {setIsLoggedIn}
    />
  )
}

export default Signup
