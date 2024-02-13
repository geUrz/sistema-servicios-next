import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Budgets } from "@/api"
import { Confirm } from "@/components/Layout/Confirm"
import { Toaster, toast } from "sonner"
import { BasicModal } from "@/layouts/BasicModal"
import { ConceptForm } from "../Concept/ConceptForm"
import styles from './Concept.module.css'

const conceptCtrl = new Budgets()

export function Concept(props) {

  const {conceptId, concept, onReload} = props

  const {user} = useAuth()
  
  const router = new useRouter()

  const [showConfirm, setShowConfirm] = useState(false)
  
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState)

  const [show, setShow] = useState(false)
  
  const onOpenClose = () => setShow((prevState) => !prevState)

  const onDelete = async () => {
    try {
      await conceptCtrl.delete(conceptId)
      openCloseConfirm()
      toast.success(' ¡ Concepto eliminado exitosamente ! ')
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
        <div>
          <h1>{concept.typearticle}</h1>
        </div>
        <div>
          <h1>{concept.concept}</h1>
        </div>
        <div>
          <h1>{concept.quantity}</h1>
        </div>
        <div>
          <h1>{concept.price}</h1>
        </div>
        <div>
          <h1>1,500</h1>
        </div>
        {/* <div>
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
        </div> */}
      </div>

    <BasicModal show={show} onClose={onOpenClose} titleModalForm='Modificar concepto'>
      <ConceptForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} budget={concept} budgetId={conceptId} />
    </BasicModal>

    <Confirm
      open={showConfirm}
      cancelButton='Cancelar'
      onConfirm={onDelete}
      onCancel={openCloseConfirm}
      content='¿ Estas seguro de eliminar el concepto ?'
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
