import * as Yup from 'yup'

export function initialValues(){
  return {
    username: '',
    email: '',
    password: ''
  }
}

export function validationSchema(){
  return Yup.object({
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true)
  })
}