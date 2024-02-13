import Link from 'next/link'
import { Image } from 'semantic-ui-react'
import styles from './Footer.module.css'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export function Footer(props) {

  const {noFooter=true} = props

  return (
    
    <>
    
      {noFooter ? (
        
        <div className={styles.containerFooter}>
        <div>
        <div className={styles.containerUbicacion}>
          <div className={styles.boxVisited}>
            <h1>visítanos en:</h1>
          </div>
          <Image src='/img/ubicacion.png' />
          <h4>Calz. Cuauhtémoc 1086-local 3,</h4>
          <h4>Prohogar, 21240 Mexicali, B.C.</h4>
        </div>
        <div className={styles.containerSiguenos}>
          <div className={styles.titleSiguenos}>
            <h4>¡ Síguenos en nuestras redes sociales !</h4>
          </div>
          <div className={styles.boxSiguenos}>
            <Link target='blank' href='https://facebook.com/vocalcoachescueladecanto/'>
              <FaFacebook />
            </Link>
            <Link target='blank' href='https://facebook.com/vocalcoachescueladecanto/'>
              <FaInstagram />
            </Link>
          </div>
        </div>
        <div className={styles.copy}>
          <h4>&copy; 2023 BARBERIA FIGARO</h4>
        </div>
        </div>
      </div>

      ) : (
        ''
      )}

    </>

  )
}
