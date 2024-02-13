import { useState } from 'react'
import { BasicLayout } from '@/layouts'
import { ChangeNameForm, ChangePassword, Info } from '@/components/Account'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import styles from './account.module.css'

export default function Account() {

  const [reload, setReload] = useState(false)

  const onReload = () => setReload((prevState) => !prevState)


  const {user, logout} = useAuth()
  const router = useRouter()

  if(!user){
    router.push('/')
    return null
  }

  const logoutSignin = () => {
    logout()
    router.push('/')
  }

  return (
    
    <BasicLayout categorie='Usuario' noFooter={false} onReload={onReload}>

      <div className={styles.containerAccount}>

        <Info onReload={onReload} />

        <div className={styles.boxSettings}>

          <ChangeNameForm reload={reload} onReload={onReload} />

          <ChangePassword />

        </div>

      </div>

    </BasicLayout>

  )
}
