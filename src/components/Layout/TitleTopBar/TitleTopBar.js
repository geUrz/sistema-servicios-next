import styles from './TitleTopBar.module.css'

export function TitleTopBar(props) {

  const {title} = props

  return (
    
    <div className={styles.titleTopBar}>
      <h1>{title}</h1>
    </div>

  )
}
