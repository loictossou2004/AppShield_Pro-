import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import '../App.css'
function NavbarComponent() {

    const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1640px] mx-auto px-4'>
        <img src={require("../assets/Pandify_Logo.png")}  className='w-44 md:w-80' alt=''/>
        <ul className='hidden md:flex whitespace-nowrap'>
            <li className='p-2  font-bold'>A propos de Pandify</li>
            <li className='p-2  font-bold'>Se connecter</li>
            <button className="bg-black font-bold whitespace-nowrap px-4 py-2 rounded-full text-white">Essayer gratuitement</button>
         </ul>
        <div onClick={handleNav} className='block md-[821px]:hidden'>
            {nav ? <AiOutlineMenu size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul className={nav ? 'fixed text-white left-0 top-0 w-[80%] h-full bg-[#857E61] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
          <img src={require("../assets/Logo.png")}  className='w-28 m-4 text-center' alt=''/>
          <li className='p-4 font-bold border-b border-white'>A propos de Pandify</li>
          <li className='p-4 font-bold border-b border-white'>Se connecter</li>
          <button className='bg-white font-bold whitespace-nowrap px-4 py-2 rounded-full mt-4 text-[#857E61]'>Essayer gratuitement</button>
      </ul>
    </div>
  );
}

export default NavbarComponent