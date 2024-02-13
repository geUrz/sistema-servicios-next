import { JoinLayout } from "@/layouts"
import styles from './signup.module.css'
import { Image } from "semantic-ui-react"
import Link from "next/link"
import { RegisterForm } from "@/components/Auth/RegisterForm"
import { FaUserPlus  } from 'react-icons/fa'



export default function Signup() {
  return (
    
    <JoinLayout>
      
      <div className={styles.containerSignin}>
        <div className={styles.boxSignin}>
          {/* <Image src='/img/adduser.png' /> */}
          <FaUserPlus />

          <div className={styles.h1}><h1>Crear cuenta</h1></div>
          
          <RegisterForm />

          <Link href='signin'>
          Iniciar sesión
          </Link>
        </div>
      </div>

    </JoinLayout>

  )
}
