import * as Yup from 'yup'

export function initialValues(task){
  return {
    task: task?.task || '',
    //nameclient: '',
    //cellnumber: '',
    description: task?.description || '',
    status: task?.status || ''
  }
}

export function validationSchema(){
  return Yup.object({
    task: Yup.string().required(true),
    //nameclient: Yup.string().required(true),
    //cellnumber: Yup.number().required(true),
    description: Yup.string().required(true),
    status: Yup.string().required(true)
  })
}