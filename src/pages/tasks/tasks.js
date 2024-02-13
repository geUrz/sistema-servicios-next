import { useEffect, useState } from 'react'
import { BasicLayout } from '@/layouts'
import { FaCog } from 'react-icons/fa'
import { ListTask } from '@/components/Task/ListTask'
import { Tasks as TasksApi } from '@/api'
import { TaskForm } from '@/components/Task'
import { Add, CountStatus, TitleTopBar } from '@/components/Layout'
import { size } from 'lodash'
import { BasicModal } from '@/layouts/BasicModal'
import styles from './tasks.module.css'

const ctrlTask = new TasksApi()

export default function Tasks(props) {

  const { onReload } = props

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  const [task, setTask] = useState([])
 
  const countAll = size(task);
  const countinProcess = size(task.filter(item => item.attributes.status=='En proceso'));
  const countFinished = size(task.filter(item=>item.attributes.status=='Terminada'));


  useEffect(() => {
    ( async () => {
      try {
        const response = await ctrlTask.getAll()
        setTask(response.data)
      } catch (error) {
          console.error(error)
      }
    })()
  }, [])


  return (

    <BasicLayout relative categorie='Tareas'>

      <Add onOpenClose={onOpenClose} />

      <div className={styles.containerMainTask}>

        <div className={styles.containerTask}>
        <TitleTopBar title='Tareas' />
        <CountStatus
        count={{countAll, countinProcess, countFinished}}
          all= 'Todas'
          inProcess= 'En proceso'
          finished= 'Terminadas'
        />
          <div className={styles.boxListTask}>
            <div className={styles.boxRow}>
              <div>
                <h1>Tarea</h1>
              </div>
              <div>
                <h1>Descripción</h1>
              </div>
              <div>
                <FaCog />
              </div>
            </div>
            <ListTask />
          </div>
        </div>
      </div>

      <BasicModal show={show} onClose={onOpenClose} titleModalForm='Crear tarea'>
        <TaskForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} />
      </BasicModal>

    </BasicLayout>

  )
}
