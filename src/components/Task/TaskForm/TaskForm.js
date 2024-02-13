import { Form, FormButton, FormField, FormGroup, FormInput, FormTextArea, Label } from "semantic-ui-react"
import { Tasks } from "@/api"
import { useAuth } from "@/hooks"
import { useFormik } from "formik"
import { Toaster, toast } from "sonner"
import { initialValues, validationSchema } from "./TaskForm.form"
import { FaTimes } from "react-icons/fa"
import styles from './TaskForm.module.css'

const taskCtrl = new Tasks()

export function TaskForm(props) {

  const { task, taskId, onOpenClose } = props

  const { user } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(task),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {

        if (taskId) {
          await taskCtrl.update(taskId, formValue)
          toast.success(' ¡ Tarea actualizada exitosamente ! ')
        } else {
          await taskCtrl.create(user.id, formValue)
          toast.success(' ¡ Tarea agregada exitosamente ! ')
        }

        formik.handleReset()
        //onReload()
        onOpenClose()
      } catch (error) {
        toast.error(' ¡ Error al agregar tarea ! ')
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
              Tarea*
            </Label>
            <FormInput
              name='task'
              type="text"
              placeholder='Nombre de la tarea'
              value={formik.values.task}
              onChange={formik.handleChange}
              error={formik.errors.task}
            />
          </FormField>
          <FormField>
            <Label>
              Descripción*
            </Label>
            <FormTextArea
              name='description'
              type="text"
              placeholder='Descripción de la tarea'
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
              <option value='Terminada'>Terminada</option>
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
      </Form>
      <Toaster
        theme="dark"
        position="bottom-center"
        duration={8000}
        visibleToasts={1}
        richColors
      />
    </>

  )
}
