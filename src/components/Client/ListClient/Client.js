import { useState } from "react"
import { useAuth } from "@/hooks"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Clients } from "@/api"
import { Confirm } from "@/components/Layout/Confirm"
import { Toaster, toast } from "sonner"
import { BasicModal } from "@/layouts/BasicModal"
import { ClientForm } from "../ClientForm" 
import styles from './Client.module.css'

const clientCtrl = new Clients()

export function Client(props) {

  const { client, clientId, onReload } = props

  const { user } = useAuth()

  const [showConfirm, setShowConfirm] = useState(false)

  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState)

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  const onDelete = async () => {
    try {
      await clientCtrl.delete(clientId)
      openCloseConfirm()
      toast.success(' ¡ Cliente eliminado exitosamente ! ')
      onReload()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    
    <>
      <div className={styles.boxRow}>
        <div>
          <h1>{client.client}</h1>
        </div>
        <div>
          <h1>{client.contact}</h1>
        </div>
        <div>
          <h1>{client.cellnumber}</h1>
        </div>
        <div>
          <h1>{client.address}</h1>
        </div>
        <div>
          {user ? (
            <div className={styles.containerActions}>
              <FaEdit
                onClick={onOpenClose} />
              <FaTrash
                className={styles.iconTrash}
                onClick={openCloseConfirm}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>

      <BasicModal show={show} onClose={onOpenClose} titleModalForm='Modificar cliente'>
        <ClientForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} client={client} clientId={clientId} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        cancelButton='Cancelar'
        onConfirm={onDelete}
        onCancel={openCloseConfirm}
        content='¿ Estas seguro de eliminar el cliente ?'
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
