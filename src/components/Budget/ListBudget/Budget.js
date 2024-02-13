import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks"
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa"
import { Budgets } from "@/api"
import { Confirm } from "@/components/Layout/Confirm"
import { Toaster, toast } from "sonner"
import { BasicModal } from "@/layouts/BasicModal"
import { PreBudgetForm } from "../BudgetForm"
import styles from './Budget.module.css'
import Link from "next/link"

const budgetCtrl = new Budgets()

export function Budget(props) {

  const { budgetId, budget, onReload } = props

  const { user } = useAuth()

  const router = new useRouter()

  const [status, setStatus] = useState()

  useEffect(() => {
    if (budget.status === 'Realizada') {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [])

  const [showConfirm, setShowConfirm] = useState(false)

  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState)

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  const onDelete = async () => {
    try {
      await budgetCtrl.delete(budgetId)
      openCloseConfirm()
      toast.success(' ¡ Cotización eliminada exitosamente ! ')
      onReload()
    } catch (error) {
      console.error(error);
    }
  }

  const noUser = () => {

    if (!user) {
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
          <h1>{budget.client}</h1>
        </div>
        <div>
          <h1>{budget.description}</h1>
        </div>
        <div>
          <h1>{budget.typedocument}</h1>
        </div>
        <div>
          {user ? (
            <div className={styles.containerActions}>
              <FaEdit
                onClick={onOpenClose} />
              <Link href={`/budget/${budgetId}`} target="blank">
                <FaFilePdf
                  className={styles.iconPDF}
                />
              </Link>
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

      <BasicModal show={show} onClose={onOpenClose} titleModalForm='Modificar pre-cotización'>
        <PreBudgetForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} budget={budget} budgetId={budgetId} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        cancelButton='Cancelar'
        onConfirm={onDelete}
        onCancel={openCloseConfirm}
        content='¿ Estas seguro de eliminar la cotización ?'
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
