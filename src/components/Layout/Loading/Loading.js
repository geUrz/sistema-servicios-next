import { GridLoader } from "react-spinners"
import styles from "./Loading.module.css"

export function Loading() {

  return (
    <div className={styles.loading}>
      <GridLoader
        color='gray'
        speedMultiplier={.6}
      />
    </div>
  )
}
