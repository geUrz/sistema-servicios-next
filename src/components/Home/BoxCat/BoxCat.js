import Link from 'next/link'
import styles from './BoxCat.module.css'

export function BoxCat(props) {

  const {children, link, categorie} = props

  return (
    
    <Link href={`${link}`}>
      <div className={styles.boxCat}>
        {children}
        <h1>{categorie}</h1>
      </div>
    </Link>

  )
}
