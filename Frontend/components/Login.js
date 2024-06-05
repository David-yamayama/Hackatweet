import styles from '../styles/Login.module.css';
import Image from 'next/image'
import { useState } from 'react';
import Modal from './Modal'



export default function Login() {

  const [isOpen, setIsOpen] = useState(false)
  const [isSignin, setIsSignin] = useState(false)

  function handleClose() {
    setIsOpen(false)

  }

  function showModalin() {
    setIsOpen(true)
    setIsSignin(true)
  }

  function showModalup() {
    setIsOpen(true)
    setIsSignin(false)

  }






  return (

    <div className={styles.main}>

      <div className={styles.leftHome}>
        <Image className={styles.logo} src='/logo_twitter.webp'
          height={250}
          width={300} />
      </div>
      <div className={styles.rightHome} >
        <img className={styles.rightLogo} src='/logo_twitter.webp'
        />
        <h1 className={styles.title}>See what's happening.</h1>
        <h3 className={styles.h3}>Join Hackatweet today.</h3>
        <button className={styles.buttonSignup} type='button' onClick={() => showModalup()} >Sign up</button>

        <p className={styles.text}>Already have an account ?</p>
        <button className={styles.buttonSignin} type='button' onClick={() => showModalin()} > Sign in</button>

        <Modal
          modalIsOpen={isOpen}
          isSignin={isSignin}
          closeModal={() => handleClose()} />


      </div>

    </div>



  );
}


