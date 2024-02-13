import { Form, FormButton, FormField, FormGroup, FormInput, FormTextArea, Label } from "semantic-ui-react"
import { Toaster, toast } from "sonner"
import { useFormik } from "formik"
import { Services } from "@/api"
import { initialValues, validationSchema } from "./ServiceForm.form"
import { useAuth } from "@/hooks"
import { FaTimes } from "react-icons/fa"
import styles from './ServiceForm.module.css'

const serviceCtrl = new Services()

export function ServiceForm(props) {

  const { service, serviceId, onOpenClose } = props

  const { user } = useAuth()


  const formik = useFormik({
    initialValues: initialValues(service),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {

        if (serviceId) {
          await serviceCtrl.update(serviceId, formValue)
          toast.success(' ¡ Servicio actualizado exitosamente ! ')
        } else {
          await serviceCtrl.create(user.id, formValue)
          toast.success(' ¡ Servicio agregado exitosamente ! ')
        }

        formik.handleReset()
        //onReload()
        onOpenClose()
      } catch (error) {
        toast.error(' ¡ Error al agregar servicio ! ')
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
              Servicio*
            </Label>
            <FormInput
              name='service'
              type="text"
              placeholder='Nombre del servicio'
              value={formik.values.service}
              onChange={formik.handleChange}
              error={formik.errors.service}
            />
          </FormField>
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
              Descripción*
            </Label>
            <FormTextArea
              name='description'
              type="text"
              placeholder='Descripción'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.errors.description}
            >
            </FormTextArea>
          </FormField>
          <FormField>
            <Label>
              Estado*
            </Label>
            <FormField
              name='status'
              type="text"
              control='select'
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.errors.status}
            >
              <option value=''>Seleccionar estado</option>
              <option value='En proceso'>En proceso</option>
              <option value='Terminado'>Terminado</option>
            </FormField>
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
          duration={3000}
          visibleToasts={1}
          richColors
        />

      </Form>
    </>

  )
}
