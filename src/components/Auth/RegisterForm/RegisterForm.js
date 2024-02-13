import { Form, FormButton, FormGroup, FormInput } from "semantic-ui-react"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { Auth } from "@/api"
import { initialValues, validationSchema } from "./RegisterForm.form"


const authCtrl = new Auth()

export function RegisterForm() {

  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authCtrl.register(formValue)
        router.push('signin')
      } catch (error) {
          console.error(error)
      }
    }
  })

  return (

    <Form onSubmit={formik.handleSubmit}>
      <FormInput 
        name='username'
        type='text' 
        placeholder='Usuario'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <FormInput 
        name='email'
        type='text' 
        placeholder='Correo'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email} 
      />
      <FormInput 
        name='password'
        type='password' 
        placeholder='Contraseña' 
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <FormGroup>
        <FormButton type='submit' size='small' color='grey' loading={formik.isSubmitting} primary>
          Crear
        </FormButton>
      </FormGroup>
    </Form>

  )
}
