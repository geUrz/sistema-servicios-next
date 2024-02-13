import Link from "next/link"
import { JoinLayout } from "@/layouts"
import { LoginForm } from "@/components/Auth/LoginForm/LoginForm"
import { FaUser } from 'react-icons/fa'
import styles from './signin.module.css'

export default function Signin() {

  return (
    
    <JoinLayout>
      
      <div className={styles.containerSignin}>
        <div className={styles.boxSignin}>
          {/* <Image src='/img/user.png' /> */}
          <FaUser />
          
          <div className={styles.h1}><h1>Iniciar sesión</h1></div>
          
          <LoginForm />

          <Link href='signup'>
            Crear cuenta
          </Link>

        </div>
      </div>

    </JoinLayout>

  )
}
