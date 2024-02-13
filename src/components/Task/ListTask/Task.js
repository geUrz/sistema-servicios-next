import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Tasks } from "@/api"
import { Confirm } from "@/components/Layout/Confirm"
import { Toaster, toast } from "sonner"
import { BasicModal } from "@/layouts/BasicModal"
import { TaskForm } from "../TaskForm"
import styles from './Task.module.css'

const taskCtrl = new Tasks()

export function Task(props) {

  const {taskId, task, onReload} = props

  const {user} = useAuth()
  
  const router = new useRouter()

  const [status, setStatus] = useState()

  const onBorderStatus = () => {
    if(task.status == 'Terminada'){
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
      await taskCtrl.delete(taskId)
      openCloseConfirm()
      toast.success(' ¡ Tarea eliminada exitosamente ! ')
      onReload()
    } catch (error) {
      console.error(error);
    }
  }


  return (
    
    <>
      <div className={styles.boxRow}>
        <div className={status ? 
          `${styles.statusFinished}` : 
          `${styles.statusinProcess}`  
        }>
          <h1>{task.task}</h1>
        </div>
        <div>
          <h1>{task.description}</h1>
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

    <BasicModal show={show} onClose={onOpenClose} titleModalForm='Modificar tarea'>
      <TaskForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} task={task} taskId={taskId} />
    </BasicModal>

    <Confirm
      open={showConfirm}
      onConfirm={onDelete}
      onCancel={openCloseConfirm}
      content='¿ Estas seguro de eliminar la tarea ?'
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
