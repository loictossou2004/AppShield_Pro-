import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'


function LoginConnexion({LoginSubmit}) {
    const navigate = useNavigate();
    const [eye, setEye] = useState(true)
    const [error, setError] = useState("")
    

    function HandlePassword() {
        setEye(!eye);
    }


    // const storeToken = (token) => {
    //     localStorage.setItem('jwtToken', token);
    // };

    // // Fonction pour récupérer le token depuis le localStorage
    // const getToken = () => {
    //     return localStorage.getItem('jwtToken');
    // };

    // const addTokenToHeader = () => {
    //     const originalFetch = window.fetch;

    //     window.fetch = function(url, options = {}) {
    //         const token = getToken();

    //         if (token) {
    //         options.headers = {
    //             ...options.headers,
    //             Authorization: token
    //         };
    //         }

    //         return originalFetch(url, options);
    //     };
    // };

    function LoginUser(event) {
        event.preventDefault();
        // const navigate = useNavigate();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const userData = {
            email: email,
            password: password
        };
        console.log(userData);

        const LogSucess = LoginSubmit(userData)
        if (LogSucess) {
            console.log('Yes, Login')
        }
        else {
            alert('No, Login')
        }





        // if (userData.password.length >= 8) {
        //     console.log("True")
        //     // setError("Mot de passe incorrect");
        //     // setTimeout(() => {
        //     //     setError(""); // Effacer la console
        //     // }, 3000);
        // }


        // fetch('http://localhost:3000/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(userData)
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     if (data.token) {
        //         const token = data.token;
        //         storeToken(token);
        //         addTokenToHeader();
        //         navigate('/Home');
        //         console.log(data);
        //     }
        // })
        //   .catch(error => {
        //     console.error(error);
        //   });
    }


    return (
        <div className='min-h-screen flex flex-col justify-center font-Poppins'>
            <div className='max-w-md w-full mx-auto  flex justify-evenly items-center'>
                <button className={"bg-[#857E61] font-bold whitespace-nowrap px-4 py-2 rounded-full text-white text-center hover:scale-125 transition duration-500 hover:duration-500"}>
                    Sign in
                </button>
            </div>

            <div className='max-w-[500PX] w-full mx-auto mt-4 bg-white p-8 rounded-3xl shadow-lm'>
                <form action='' className='space-y-2' onSubmit={LoginUser}>
                    <div>
                        <label className='text-sm font-extrabold '>Adresse E-mail</label>
                        <input type='email' id='email' placeholder='Saisissez votre e-mail' className='w-full p-2 py-sm-3 rounded-xl mt-1 outline-non border placeholder:font-extrabold' required/>
                    </div>
                    <div className='relative'>

                        <label className='text-sm font-extrabold '>Mot de passe</label>
                        <input type={eye ? "password" : "text"} id='password' placeholder='Saisissez votre mot de passe' className='border w-full p-2 py-sm-3 rounded-xl outline-none placeholder:font-extrabold' required/>
                        {
                            eye ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye absolute top-1/2 right-3 text-gray-400 cursor-pointer" viewBox="0 0 16 16" onClick={(e)=>HandlePassword()}>
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                             :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye absolute top-1/2 right-3 text-gray-400 cursor-pointer" viewBox="0 0 16 16" onClick={(e)=>HandlePassword()}>
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        }
                    </div>
                    <div className='flex justify-center font-bold'>
                        <p className='text-red-500'>{error}</p>
                    </div>
                    <div className='flex justify-center font-bold'>
                        <button className="bg-[#857E61] font-bold whitespace-nowrap px-4 py-2 rounded-full text-white text-center hover:scale-125 transition duration-500 hover:duration-500">Login</button>
                    </div>
                </form>
            </div>


        </div>
    )
}



function ConfirmationMailOTP() {
    return (
        <div className='min-h-screen flex flex-col justify-center font-Poppins'>
            <div className='max-w-[400PX] w-full mx-auto mt-4 bg-white p-8 rounded-3xl shadow-lm text-gray-500'>
                <label className='text-sm font-extrabold text-center'>Un code de confirmation a été envoyé à votre adresse mail. Veuillez le confirmer</label>
                <form action='' className='space-y-2'>
                    <div>
                        <input type="text" pattern="[0-9]{6}" placeholder='XXX-XXX' className='w-full p-2 rounded-xl mt-1 outline-non border placeholder:font-extrabold' required />
                    </div>
                    <div className='flex justify-center font-bold py-2 pb-3'>
                        <button className="bg-[#857E61] font-bold whitespace-nowrap px-4 py-2 rounded-full text-white text-center hover:scale-125 transition duration-500 hover:duration-500">Valider</button>
                    </div>
                </form>
                <div className='text-center font-bold'>
                    <p className='text-sm hover:cursor-pointer text-[#857E61]'>Renvoyer un code de vérification</p>
                </div>

            </div>

        </div>
    )
}

function Loginregister() {

    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const storedShowConfirmation = localStorage.getItem('showConfirmation');
        setShowConfirmation(storedShowConfirmation === 'true');
    }, []);

    const handleLoginSubmit = (userData) => {
        // Vérification de la longueur du mot de passe
        if (userData.password === "admin" && userData.email === "admin@gmail.com") {
            // Afficher la confirmation de l'e-mail en changeant l'état
            setShowConfirmation(true);
            localStorage.setItem('showConfirmation', 'true');

            // setTimeout(() => {
            //     alert("Vous avez pris trop de temps. Vous serez redirigé sur la page d'authentification")
            //     setShowConfirmation(false);
            //     localStorage.setItem('showConfirmation', 'false');
            // }, 10 * 1000);
            return true; // Indiquez que l'opération de connexion a réussi
        } else {
            return false; // Indiquez que l'opération de connexion a échoué
        }
    }

    return (
        <div>
            {!showConfirmation && <LoginConnexion LoginSubmit={handleLoginSubmit} />}
            {showConfirmation && <ConfirmationMailOTP/>}
            {/* <LoginConnexion/>
           <ConfirmationMailOTP/> */}
        </div>
    )
}

export default Loginregister