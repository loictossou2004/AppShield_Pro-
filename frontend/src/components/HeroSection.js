import React, {  } from 'react';
// import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import '../App.css'
function HeroSection() {

  return (
    <div name="home" className="w-full h-screen md:fixed">
      <div className=" max-w-screen-lg  flex flex-col-reverse md:flex-row items-center justify-center h-full px-4">
        <div className="flex flex-col justify-center h-[90%] ">
          <h2 className="md:text-1xl font-bold">
            Bienvenue sur <span className='text-6xl md:text-7xl  text-[#857E61]'>AppShield Pro</span>
          </h2>
          <p className="text-gray-500  max-w-md text-1xl line-he">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
            <div className='w-full'>
                <img
                    src={require("../assets/Button.png")}
                    alt="my profile"
                    className="rounded-2xl left-5"
                />
            </div>
        </div>
        <div className=''>
          <img
            src={require("../assets/3Dmodele.png")}
            alt="my profile"
            className="rounded-2xl mx-auto w-full"
          />
        </div>
      </div>
    </div>


    // <div className='bg-blue-100 p-64 py-64'>
    //     <div className='md:flex flex-row space-x-6 '>
    //         <div className='basis-1/2'>
    //             <span className='text-4xl font-bold'>
    //                 Bienvenue sur <span className='text-7xl text-[#857E61]'>Pandify</span>
    //             </span>
    //             <br/>
    //             <div className='pt-2 text-xl'>
    //                 <span>
    //                     La plateforme de music basée sur l'environnement ANP. <span className='text-[#857E61]'>ANP</span> est une crypto monnaie pour les createur
    //                     et leur fan. C'est la monnaie de ceux qui sont creatifs.
    //                 </span>
    //                 <br></br>
    //                 <div className='flex justify-center align-items-center py-7'>
    //                     <button className="bg-[#857E61] font-bold whitespace-nowrap px-4 py-2 rounded-full text-white">En savoir plus</button>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className='basis-1/2'>
    //             papa
    //         </div>

    //     </div>
    // </div>
  );
}

export default HeroSection