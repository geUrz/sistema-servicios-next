import { useEffect, useState } from 'react'
import { Loading } from '@/components/Layout/Loading'
import { map, size } from 'lodash'
import { Clients } from '@/api'
import { ListEmpty } from '@/components/Layout/ListEmpty'
import { Client } from './Client'
import styles from './ListClient.module.css'

const listclientCtrl = new Clients()

export function ListClient(props) {

  const { reload, onReload } = props

  const [listclients, setListClients] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await listclientCtrl.getAll()
        setListClients(response.data)

      } catch (error) {
        console.error(error)
      }
      
    })()
    
  }, [reload])

  return (
    
    <>
      {!listclients  ? (
        <Loading />
      ) :
      size(listclients) === 0 ? (
        <ListEmpty />
      ) : (
        <>
        <div className={styles.mainListsong}>
          {map(listclients, (listclient) => (
            <Client
              key={listclient.id} 
              clientId={listclient.id}
              client={listclient.attributes}  
              onReload={onReload}
            />
          ))}
        </div>
      </>
      )} 
    </>

  )
}
