import { useEffect, useState } from 'react'
import { Loading } from '@/components/Layout/Loading'
import { map, size } from 'lodash'
import { Services } from '@/api'
import { Service } from './Service'
import { ListEmpty } from '@/components/Layout/ListEmpty'
import styles from './ListService.module.css'

const listserviceCtrl = new Services()

export function ListService(props) {

  const { reload, onReload } = props

  const [listservices, setListServices] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await listserviceCtrl.getAll()
        setListServices(response.data)

      } catch (error) {
        console.error(error)
      }
      
    })()
    
  }, [reload])


  return (
    
    <>
      {!listservices  ? (
        <Loading />
      ) :
      size(listservices) === 0 ? (
        <ListEmpty />
      ) : (
        <div className={styles.mainListsong}>
          {map(listservices, (listservice) => (
            <Service
              key={listservice.id} 
              serviceId={listservice.id}
              service={listservice.attributes}  
              onReload={onReload}
            />
          ))}
        </div>
      )} 
    </>

  )
}
