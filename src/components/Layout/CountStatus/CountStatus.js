import { useState } from 'react'
import styles from './CountStatus.module.css'

export function CountStatus(props) {

  const {all, inProcess, finished, count: {countAll, countinProcess, countFinished}} = props

  const [select1, setSelect1] = useState(true)
  const [select2, setSelect2] = useState(false)
  const [select3, setSelect3] = useState(false)

  const onSelect1 = () => {
    setSelect1(true)
    setSelect2(false)
    setSelect3(false)
  }

  const onSelect2 = () => {
    setSelect1(false)
    setSelect2(true)
    setSelect3(false)
  }

  const onSelect3 = () => {
    setSelect1(false)
    setSelect2(false)
    setSelect3(true)
  }

  return (

    <div className={styles.boxCount}>
      <h4 
        className={select1 ? 
          `${styles.boxCountSelect}` : ''}
        onClick={onSelect1}
      >
        
        ({countAll}) {all}
      </h4>
      <h4 
        className={select2 ?
           `${styles.boxCountSelect}` : ''}
        onClick={onSelect2}
        >
        
        ({countinProcess}) {inProcess}
      </h4>
      <h4 
        className={select3 ?
           `${styles.boxCountSelect}` : ''}
        onClick={onSelect3}
        >
        
        ({countFinished}) {finished}
      </h4>
    </div>

  )
}
