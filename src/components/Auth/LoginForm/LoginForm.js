import { useRouter } from "next/router";
import { Form, FormButton, FormGroup, FormInput } from "semantic-ui-react";
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./LoginForm.form"
import { useAuth } from "@/hooks"
import { Auth } from "@/api"
import { Toaster, toast } from "sonner"

const authCtrl = new Auth()

export function LoginForm() {

  const router = useRouter()
  const {login} = useAuth()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue)
        login(response.jwt)
        router.push('/')
      } catch (error) {
          toast.error(' ¡ Usuario y/o contraseña incorrecta ! ')
        
          console.error(error)
      }
    }
  })

  return (
  
  <Form onSubmit={formik.handleSubmit}>
    <FormInput 
      name='identifier'
      type='text' 
      placeholder='Usuario'
      value={formik.values.identifier}
      onChange={formik.handleChange}
      error={formik.errors.identifier}
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
      <FormButton 
        type='submit' 
        size='small'  
        loading={formik.isSubmitting} 
        primary 
      >
        Entrar
      </FormButton>
    </FormGroup>
    <Toaster 
      theme="dark"
      position="bottom-center"
      duration={8000}
      visibleToasts={1}
      richColors
    />
  </Form>
  )
}
