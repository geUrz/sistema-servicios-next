import { useAuth } from "@/hooks"
import styles from './Info.module.css'
import { FaUser } from "react-icons/fa"


export function Info() {

  const {user} = useAuth()

  return (
    
    <div className={styles.containerInfo}>
      <div className={styles.boxInfo}>
        <FaUser />
        <div>
          <h1>{user.username}</h1>
          <h2>{user.email}</h2>
        </div>
      </div>
    </div>

  )
}
