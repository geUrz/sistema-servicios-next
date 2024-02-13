import { Button, Form, FormButton, FormField, FormGroup, FormInput, FormTextArea, Label } from "semantic-ui-react"
import { Toaster, toast } from "sonner"
import { useFormik } from "formik"
import { Budgets } from "@/api"
import { initialValues, validationSchema } from "./PreBudgetForm.form"
import { useAuth } from "@/hooks"
import { FaTimes } from "react-icons/fa"
import styles from './BudgetForm.module.css'

const budgetCtrl = new Budgets()

export function PreBudgetForm(props) {

  const { budget, budgetId, onOpenClose } = props

  const { user } = useAuth()

  const generateNumber = () => {
    let end = 1150
    let start = 1800
    console.log(Math.floor(Math.random() * (end - start + 1)) + start)
  }


  const formik = useFormik({
    initialValues: initialValues(budget),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {

        if (budgetId) {
          await budgetCtrl.update(budgetId, formValue)
          toast.success(' ¡ Cotización actualizada exitosamente ! ')
        } else {
          await budgetCtrl.create(user.id, formValue)
          toast.success(' ¡ Pre-cotización agregada exitosamente ! ')
        }

        formik.handleReset()
        //onReload()
        onOpenClose()
      } catch (error) {
        toast.error(' ¡ Error al agregar pre-cotización ! ')
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
              Descripción*
            </Label>
            <FormTextArea
              name='description'
              type="text"
              placeholder='Descripción de la cotización'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.errors.description}
            >
            </FormTextArea>
          </FormField>
          <FormField>
            <Label>
              Tipo de documento*
            </Label>
            <FormField
              name='typedocument'
              type="text"
              control='select'
              value={formik.values.typedocument}
              onChange={formik.handleChange}
              error={formik.errors.typedocument}
            >
              <option value=''>Seleccionar documento</option>
              <option value='Cotización'>Cotización</option>
              <option value='Recibo'>Recibo</option>
            </FormField>
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
              <option value='Realizada'>Realizada</option>
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
