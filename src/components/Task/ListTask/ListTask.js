import { useEffect, useState } from 'react'
import { Loading } from '@/components/Layout/Loading'
import { map, size } from 'lodash'
import { Tasks } from '@/api'
import { Task } from './Task'
import { FaSkullCrossbones } from 'react-icons/fa'
import styles from './ListTask.module.css'
import { ListEmpty } from '@/components/Layout/ListEmpty'

const listtaskCtrl = new Tasks()

export function ListTask(props) {

  const { reload, onReload } = props

  const [listtasks, setListtasks] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await listtaskCtrl.getAll()
        setListtasks(response.data)

      } catch (error) {
        console.error(error)
      }
      
    })()
    
  }, [reload])


  return (
    
    <>
      {!listtasks  ? (
        <Loading />
      ) :
      size(listtasks) === 0 ? (
        <ListEmpty />
      ) : (
        <div className={styles.mainListsong}>
          {map(listtasks, (listtask) => (
            <Task
              key={listtask.id} 
              taskId={listtask.id}
              task={listtask.attributes}  
              onReload={onReload}
            />
          ))}
        </div>
      )} 
    </>

  )
}
