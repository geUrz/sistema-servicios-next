import { FaPlus } from 'react-icons/fa'
import styles from './Add.module.css'

export function Add(props) {

  const {onOpenClose} = props

  return (
    
    <>

      <div className={styles.containerAdd} onClick={onOpenClose}>
        <FaPlus />
      </div>


    </>

  )
}
