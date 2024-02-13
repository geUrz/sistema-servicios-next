import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import { Image } from 'semantic-ui-react'
import { FaBars, FaCheck, FaClipboard, FaEdit, FaFile, FaHome, FaPaperclip, FaSignOutAlt, FaTasks, FaTimes, FaTools, FaUser, FaUserCircle, FaUserFriends } from 'react-icons/fa'
import styles from './TopBar.module.css'


export function TopBar(props) {

  const { categorie } = props

  const { user } = useAuth()

  const router = useRouter()

  const [menu, setMenu] = useState()

  const menuOpen = () => {
    setMenu(prevState => !prevState)
  }

  const goToAccountSignin = () => {
    
    if(user){
      router.push('/account')
      menuOpen()
    }else{
      router.push('/join/signin')
      menuOpen()
    }

  }


  const [borderPanel, setBorderPanel] = useState()
  const [borderTask, setBorderTask] = useState()
  const [borderServ, setBorderServ] = useState()
  const [borderBudget, setBorderBudget] = useState()
  const [borderReports, setBorderReports] = useState()
  const [borderClient, setBorderClient] = useState()
  const [borderUsers, setBorderUsers] = useState()

  const isBorderPanel = () => {
    
    if(categorie == 'Panel'){
      setBorderPanel(true)
      setBorderTask(false)
      setBorderServ(false)
      setBorderBudget(false)
      setBorderReports(false)
      setBorderClient(false)
      setBorderUsers(false)
    }
    else if(categorie == 'Tareas'){
      setBorderPanel(false)
      setBorderTask(true)
      setBorderServ(false)
      setBorderBudget(false)
      setBorderReports(false)
      setBorderClient(false)
      setBorderUsers(false)
    }
    else if(categorie == 'Servicios'){
      setBorderPanel(false)
      setBorderTask(false)
      setBorderServ(true)
      setBorderBudget(false)
      setBorderReports(false)
      setBorderClient(false)
      setBorderUsers(false)
    }
    else if(categorie == 'Cotizaciones'){
      setBorderPanel(false)
      setBorderTask(false)
      setBorderServ(false)
      setBorderBudget(true)
      setBorderReports(false)
      setBorderClient(false)
      setBorderUsers(false)
    }
    else if(categorie == 'Reportes'){
      setBorderPanel(false)
      setBorderTask(false)
      setBorderServ(false)
      setBorderBudget(false)
      setBorderReports(true)
      setBorderClient(false)
      setBorderUsers(false)
    }
    else if(categorie == 'Clientes'){
      setBorderPanel(false)
      setBorderTask(false)
      setBorderServ(false)
      setBorderBudget(false)
      setBorderReports(false)
      setBorderClient(true)
      setBorderUsers(false)
    }
    else if(categorie == 'Usuarios'){
      setBorderPanel(false)
      setBorderTask(false)
      setBorderServ(false)
      setBorderBudget(false)
      setBorderReports(false)
      setBorderClient(false)
      setBorderUsers(true)
    }

  }

  useEffect(() => {
    isBorderPanel()
  }, [])

  return (

    <>
      <div className={styles.containerMenu}>
        <div className={styles.logoTitle}>
          <Link href='/'>
            <Image src='/img/logo.png' alt='Logo' />
          </Link>
          <div></div>
          <h1>{categorie}</h1>
        </div>

        <div className={styles.iconBar}>
          <div onClick={menuOpen}>
            {menu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </div>
        </div>
      </div>

      <div className={styles.containerMenuSide} style={{ left: menu ? '0' : '-100%' }}>
        <div className={styles.topMenuSide} onClick={goToAccountSignin}>
          {user ? (
              <>
                <FaUserCircle />
              <h1>{user.username}</h1>
              </>
          ) : (
              <>
                <FaUserCircle />
              <h1>Iniciar sesión</h1>
              </>
          )}
        </div>
        <div className={styles.listaMenuSide}>
          <Link href='/'>
            <div onClick={menuOpen} 
              className={borderPanel ? 
                `${styles.isActive}` : 
                `${styles.noActive}`}>
              <FaHome />
              <h1>Panel</h1>
            </div>
          </Link>
          <Link href='/tasks'>
          <div onClick={menuOpen} 
              className={borderTask ? 
                `${styles.isActive}` : 
                `${styles.noActive}`}>
              <FaPaperclip />
              <h1>Tareas</h1>
            </div>
          </Link>
          <Link href='/services'>
          <div onClick={menuOpen} 
              className={borderServ ? 
                `${styles.isActive}` : 
                `${styles.noActive}`}>
              <FaClipboard />
              <h1>Servicios</h1>
            </div>
          </Link>
          <Link href='/budgets'>
          <div onClick={menuOpen} 
              className={borderBudget ? 
                `${styles.isActive}` : 
                `${styles.noActive}`}>
              <FaFile />
              <h1>Cotizaciones</h1>
            </div>
          </Link>
          <Link href='/reports'>
          <div onClick={menuOpen} 
              className={borderReports ? 
                `${styles.isActive}` : 
                `${styles.noActive}`}>
              <FaEdit />
              <h1>Reportes</h1>
            </div>
          </Link>
          <Link href='/clients'>
          <div onClick={menuOpen} 
              className={borderClient ? 
                `${styles.isActive}` : 
                `${styles.noActive}`}>
              <FaUser />
              <h1>Clientes</h1>
            </div>
          </Link>
          <Link href='/users'>
          <div onClick={menuOpen} 
              className={borderUsers ? 
                `${styles.isActive}` : 
                `${styles.noActive}`}>
              <FaUserFriends />
              <h1>Usuarios</h1>
            </div>
          </Link>
        </div>
        <div className={styles.logoBottom}>
          <Link href='/'>
            <Image src='/img/logo.png' alt='Logo' />
          </Link>
        </div>
      </div>

    </>

  )
}
