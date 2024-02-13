import { Modal } from "semantic-ui-react"
import styles from './BasicModal.module.css'

export function BasicModal(props) {

  const {children, show, titleModalForm } = props

  return (
    
    <>
      <Modal open={show} size="small" className={styles.modal}>
        <Modal.Header className={styles.header}>
          {titleModalForm}
        </Modal.Header>
        <Modal.Content className={styles.content}>{children}</Modal.Content>
      </Modal>
    </>

  )
}
