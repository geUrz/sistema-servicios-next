import { useRouter } from 'next/router'
import { useAuth } from '@/hooks'
import { Image } from 'semantic-ui-react'
import styles from './JoinLayout.module.css'

export function JoinLayout(props) {

  const {children} = props

  const {user} = useAuth()
  const router = useRouter()

  if(user){
    router.push('/')
    return null
  }

  return (
    
    <>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Image src='/img/logo.png' alt='Logo' />
        </div>
      </div>
    
      {children}
    </>

  )
}
