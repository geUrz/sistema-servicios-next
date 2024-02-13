import { useFormik } from 'formik'
import { FaTimes } from 'react-icons/fa'
import { Form, FormButton, FormField, FormGroup, FormInput, Label } from 'semantic-ui-react'
import { initialValues, validationSchema } from './ConceptForm.form'
import { useAuth } from '@/hooks'
import { Toaster, toast } from 'sonner'
import { Budgets } from '@/api'
import styles from './ConceptForm.module.css'

const budgetCtrl = new Budgets()

export function ConceptForm(props) {

  const {budget, budgetId, onOpenClose} = props

  const {user} = useAuth()

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
              Tipo de articulo*
            </Label>
            <FormField
              name='typearticle'
              type="text"
              control='select'
              value={formik.values.typearticle}
              onChange={formik.handleChange}
              error={formik.errors.typearticle}
            >
              <option value=''>Seleccionar tipo de articulo</option>
              <option value='Producto'>Producto</option>
              <option value='Servicio'>Servicio</option>
            </FormField>
          </FormField>
          <FormField>
            <Label>
              Concepto*
            </Label>
            <FormInput
              name='concept'
              type="text"
              placeholder='Concepto'
              value={formik.values.concept}
              onChange={formik.handleChange}
              error={formik.errors.concept}
            />
          </FormField>
          <FormField>
            <Label>
              Qty*
            </Label>
            <FormInput
              name='quantity'
              type="number"
              placeholder='Cantidad'
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.errors.quantity}
            />
          </FormField>
          <FormField>
            <Label>
              P. Unitario*
            </Label>
            <FormInput
              name='price'
              type="number"
              placeholder='Precio unitario'
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.errors.price}
            />
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
