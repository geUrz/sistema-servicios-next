import * as Yup from 'yup'

export function initialValues(budget){
  return {
    typearticle: budget?.typearticle || '',
    concept: budget?.concept || '',
    quantity: budget?.quantity || '',
    price: budget?.price || ''
  }
}

export function validationSchema(){
  return Yup.object({
    typearticle: Yup.string().required(true),
    concept: Yup.string().required(true),
    quantity: Yup.number().required(true),
    price: Yup.number().required(true)
  })
}