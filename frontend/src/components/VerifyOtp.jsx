import React from 'react';
import {BsFillShieldLockFill} from "react-icons/bs";
import OtpInput from "otp-input-react";


const VerifyOtp = () => {
  return (
    <section className='bg-emerald-500 flex items-center justify-center h-screen'>
        <div>
            <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
                <h1 className='tracking-normal text-centre leading-normal text-white font-medium text-3xl mb-6'>
                    Welcome  to <br /> SOCIOROOM
                </h1>
                <>
                    <div className='bg-white text-emerald-500 w-fit mx-auto
                    p-4 rounded-full'>
                        <BsFillShieldLockFill size={30}/>
                    </div>
                    <label htmlFor='ph' className='font-bold text-2xl text-white text-center'>
                        Enter your Otp
                    <OtpInput OTPLength={6} 
                    otpType={6}
                    disabled={false}
                    autoFocus></OtpInput>
                    </label>
                </>

            </div>
        </div>
    </section>
  );
}

export default VerifyOtp;
