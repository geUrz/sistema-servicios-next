import * as Yup from 'yup'

export function initialValues(client){
  return {
    client: client?.client || '',
    contact: client?.contact || '',
    cellnumber: client?.cellnumber || '',
    address: client?.address || ''
  }
}

export function validationSchema(){
  return Yup.object({
    client: Yup.string().required(true),
    contact: Yup.string().required(true),
    cellnumber: Yup.number().required(true),
    address: Yup.string().required(true)
  })
}