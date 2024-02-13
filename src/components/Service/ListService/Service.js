import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Services } from "@/api"
import { Confirm } from "@/components/Layout/Confirm"
import { Toaster, toast } from "sonner"
import { BasicModal } from "@/layouts/BasicModal"
import { ServiceForm } from "../ServiceForm"
import styles from './Service.module.css'

const serviceCtrl = new Services()

export function Service(props) {

  const {serviceId, service, onReload} = props

  const {user} = useAuth()
  
  const router = new useRouter()

  const [status, setStatus] = useState()

  const onBorderStatus = () => {
    if(service.status == 'Terminado'){
      setStatus(true)
    }else{
      setStatus(false)
    }
  }

  useEffect(() => {
    onBorderStatus()
  }, [])
  
  const [showConfirm, setShowConfirm] = useState(false)
  
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState)

  const [show, setShow] = useState(false)
  
  const onOpenClose = () => setShow((prevState) => !prevState)

  const onDelete = async () => {
    try {
      await serviceCtrl.delete(serviceId)
      openCloseConfirm()
      toast.success(' ¡ Servicio eliminado exitosamente ! ')
      onReload()
    } catch (error) {
      console.error(error);
    }
  }

  const noUser = () => {

    if(!user){
      router.push('join/signin')
      return null
    } else {
      openCloseConfirm()
    }
    
  }

  return (
    
    <>
      <div className={styles.boxRow}>
        <div className={status ? 
          `${styles.statusFinished}` : 
          `${styles.statusinProcess}`  
        }>
          <h1>{service.service}</h1>
        </div>
        <div>
          <h1>{service.clients.data[0].attributes.client}</h1>
        </div>
        <div>
          <h1>{service.description}</h1>
        </div>
        <div>
          {user ? (
            <div className={styles.containerActions}>
              <FaEdit onClick={onOpenClose} />
              <FaTrash onClick={openCloseConfirm} className={styles.iconTrash} />
            </div>   
          ) : (
            <div />
          )}
        </div>
      </div>

    <BasicModal show={show} onClose={onOpenClose} titleModalForm='Modificar servicio'>
      <ServiceForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} service={service} serviceId={serviceId} />
    </BasicModal>

    {/* <BasicModal show={showDetails} onClose={onOpenDetails} titleModalForm='Detalles de la tarea'>
      <h1>{taskDetails.attributes.nametask}</h1> 
      <h1>{taskDetails.attributes.description}</h1> 
      <h1>{taskDetails.attributes.createdAt}</h1> 
    </BasicModal> */}

    <Confirm
      open={showConfirm}
      cancelButton='Cancelar'
      onConfirm={onDelete}
      onCancel={openCloseConfirm}
      content='¿ Estas seguro de eliminar el servicio ?'
    />

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
