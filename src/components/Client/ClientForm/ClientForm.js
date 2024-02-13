import { Form, FormButton, FormField, FormGroup, FormInput, FormTextArea, Label } from "semantic-ui-react"
import { Toaster, toast } from "sonner"
import { useFormik } from "formik"
import { Clients } from "@/api"
import { initialValues, validationSchema } from "./ClientForm.form"
import { useAuth } from "@/hooks"
import { FaTimes } from "react-icons/fa"
import styles from './ClientForm.module.css'

const clientCtrl = new Clients()

export function ClientForm(props) {

  const { client, clientId, onOpenClose } = props

  const { user } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(client),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {

        if (clientId) {
          await clientCtrl.update(clientId, formValue)
          toast.success(' ¡ Cliente actualizado exitosamente ! ')
        } else {
          await clientCtrl.create(user.id, formValue)
          toast.success(' ¡ Cliente agregado exitosamente ! ')
        }

        formik.handleReset()
        //onReload()
        onOpenClose()
      } catch (error) {
        toast.error(' ¡ Error al agregar cliente ! ')
        console.error(error);
      }
    },
  })

  return (

    <>
      <div className={styles.iconClose} onClick={onOpenClose}>
        <FaTimes />
      </div>

      <Form onSubmit={formik.handleSubmit}>
        <FormGroup widths='equal'>
          <FormField>
            <Label>
              Cliente*
            </Label>
            <FormInput
              name='client'
              type="text"
              placeholder='Nombre del cliente'
              value={formik.values.client}
              onChange={formik.handleChange}
              error={formik.errors.client}
            />
          </FormField>
          <FormField>
            <Label>
              Contacto*
            </Label>
            <FormInput
              name='contact'
              type="text"
              placeholder='Nombre del contacto'
              value={formik.values.contact}
              onChange={formik.handleChange}
              error={formik.errors.contact}
            />
          </FormField>
          <FormField>
            <Label>
              Celular*
            </Label>
            <FormInput
              name='cellnumber'
              type="number"
              placeholder='Numero de celular'
              value={formik.values.cellnumber}
              onChange={formik.handleChange}
              error={formik.errors.cellnumber}
            />
          </FormField>
          <FormField>
            <Label>
              Dirección*
            </Label>
            <FormTextArea
              name='address'
              type="text"
              placeholder='Dirección'
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            >
            </FormTextArea>
          </FormField>
        </FormGroup>
        <FormButton
          primary
          type="submit"
          loading={formik.isSubmitting}
        >
          Crear
        </FormButton>
        <Toaster
          theme="dark"
          position="bottom-center"
          duration={5000}
          visibleToasts={1}
          richColors
        />

      </Form>
    </>

  )
}
