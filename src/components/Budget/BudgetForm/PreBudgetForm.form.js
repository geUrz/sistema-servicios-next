import * as Yup from 'yup'

export function initialValues(budget){
  return {
    client: budget?.client || '',
    contact: budget?.contact || '',
    description: budget?.description || '',
    typedocument: budget?.typedocument || '',
    status: budget?.status || ''
  }
}

export function validationSchema(){
  return Yup.object({
    client: Yup.string().required(true),
    contact: Yup.string().required(true),
    description: Yup.string().required(true),
    typedocument: Yup.string().required(true),
    status: Yup.string().required(true)
  })
}