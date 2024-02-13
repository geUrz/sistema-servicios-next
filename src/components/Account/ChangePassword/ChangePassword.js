import { useState } from "react"
import { BasicModal } from "@/layouts/BasicModal"
import { Button, Form, FormButton, FormInput } from "semantic-ui-react"
import styles from './ChangePassword.module.css'


export function ChangePassword() {

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  return (
    
    <>
    
      <Button primary size="small" onClick={onOpenClose}>
        Cambiar contraseña
      </Button>

      <BasicModal show={show} onClose={onOpenClose}>
        <Form>
          <h1 className={styles.titleLetter}>Cambiar contraseña</h1>
          <FormInput 
            placeholder='Nueva contraseña'
          />
          <FormButton primary size="small">
            Guardar
          </FormButton>
        </Form>
      </BasicModal>
    
    </>

  )
}
