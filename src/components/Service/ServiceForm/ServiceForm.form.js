import * as Yup from 'yup'

export function initialValues(service){
  return {
    service: service?.service || '',
    client: service?.client || '',
    description: service?.description || '',
    status: service?.status || ''
  }
}

export function validationSchema(){
  return Yup.object({
    service: Yup.string().required(true),
    client: Yup.string().required(true),
    description: Yup.string().required(true),
    status: Yup.string().required(true)
  })
}