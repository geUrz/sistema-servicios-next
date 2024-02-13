import { useState } from "react"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangeNameForm.form"
import { BasicModal } from "@/layouts/BasicModal"
import { Button, Form, FormButton, FormField, FormInput } from "semantic-ui-react"
import { useAuth } from "@/hooks"
import { User } from "@/api"
import styles from './ChangeNameForm.module.css'
import { FaTimes } from "react-icons/fa"

const userCtrl = new User()

export function ChangeNameForm(props) {

  const {reload, onReload} = props

  const {user} = useAuth()

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  const formik = useFormik({
    initialValues: initialValues(user.username),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, formValue)
        onOpenClose()
        onReload()
      } catch (error) {
        console.error(error)
      }

    }
  }, [reload])

  return (
    
    <>
    
      <Button primary size="small" onClick={onOpenClose}>
        Cambiar nombre de usuario
      </Button>

      <BasicModal show={show} onClose={onOpenClose}>
        <div className={styles.boxClose} onClick={onOpenClose}>
          <FaTimes />
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <h1 className={styles.titleLetter}>Cambiar nombre de usuario</h1>
          <FormInput
            name='username' 
            placeholder='Nuevo nombre de usuario'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.errors.username}
          />
          <FormField>
            <FormButton 
              primary 
              type="submit"
              size="small"
              loading={formik.isSubmitting}
            >
              Guardar
            </FormButton>
          </FormField>
        </Form>
      </BasicModal>
    
    </>

  )
}
