import { FaSkullCrossbones } from "react-icons/fa";
import styles from './ListEmpty.module.css'


export function ListEmpty() {
  return (
    
    <div className={styles.listEmpty}>
      <FaSkullCrossbones />
      <h1>¡ Lista vacia !</h1>
    </div>

  )
}
