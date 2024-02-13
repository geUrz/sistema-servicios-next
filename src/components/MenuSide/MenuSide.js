import Link from 'next/link'
import styles from './MenuSide.module.css'
import { useAuth } from '@/hooks'
import { FaClipboard, FaEdit, FaFile, FaHome, FaPaperclip, FaUser, FaUserCircle, FaUserFriends } from 'react-icons/fa'

export function MenuSide() {

  const {user} = useAuth()

  return (
    
    <div className= {styles.containerMenuSide}> 
        <Link href='/'>
          <div className={styles.topMenuSide}>
            {user ? (
              <Link href='/account'> 
                <FaUserCircle />
                <h1>{user.username}</h1>
              </Link>
            ) : (
              <Link href='/join/signin'> 
                <FaUserCircle />
                <h1>Iniciar sesión</h1>
              </Link>
            )}
          </div>   
        </Link>
        <div className={styles.listaMenuSide}>
          <Link href='/'>
            <div>
              <FaHome />
              <h1>Panel</h1>
            </div>
          </Link>
          <Link href='/tasks'>
            <div>
              <FaPaperclip />
              <h1>Tareas</h1>
            </div>
          </Link>
          <Link href='/services'>
            <div>
              <FaClipboard />
              <h1>Servicios</h1>
            </div>
          </Link>
          <Link href='/budgets'>
            <div>
              <FaFile />
              <h1>Cotizaciones</h1>
            </div>
          </Link>
          <Link href='/reports'>
            <div>
              <FaEdit />
              <h1>Reportes</h1>
            </div>
          </Link>
          <Link href='/clients'>
            <div>
              <FaUser />
              <h1>Clientes</h1>
            </div>
          </Link>
          <Link href='/users'>
            <div>
              <FaUserFriends />
              <h1>Usuarios</h1>
            </div>
          </Link>
        </div> 
      </div>

  )
}
