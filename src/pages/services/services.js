import { useEffect, useState } from 'react'
import { BasicLayout } from '@/layouts'
import { FaCog } from 'react-icons/fa'
import { ListService, ServiceForm } from '@/components/Service'
import { Add, CountStatus, TitleTopBar } from '@/components/Layout'
import { Services as ServicesApi } from '@/api'
import { size } from 'lodash'
import { BasicModal } from '@/layouts/BasicModal'
import styles from './services.module.css'

const ctrlService = new ServicesApi()

export default function Services(props) {

  const { onReload } = props

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  const [service, setService] = useState([])
 
  const countAll = size(service)
  const countinProcess = size(service.filter(item => item.attributes.status=='En proceso'))
  const countFinished = size(service.filter(item=>item.attributes.status=='Terminado'))

  useEffect(() => {
    ( async () => {
      try {
        const response = await ctrlService.getAll()
        setService(response.data)
      } catch (error) {
          console.error(error)
      }
    })()
  }, [])

  return (

    <BasicLayout relative categorie='Servicios'>

      <Add onOpenClose={onOpenClose} />

      <div className={styles.containerMainService}>
        <div className={styles.containerService}>
          <TitleTopBar title='Servicios' />
          <CountStatus
            count={{ countAll, countinProcess, countFinished }}
            all='Todos'
            inProcess='En proceso'
            finished='Terminados'
          />
          <div className={styles.boxListService}>
            <div className={styles.boxRow}>
              <div>
                <h1>Servicio</h1>
              </div>
              <div>
                <h1>Cliente</h1>
              </div>
              <div>
                <h1>Descripción</h1>
              </div>
              <div>
                <FaCog />
              </div>
            </div>
            <ListService />
          </div>
        </div>
      </div>

      <BasicModal show={show} onClose={onOpenClose} titleModalForm='Crear servicio'>
        <ServiceForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} />
      </BasicModal>

    </BasicLayout>

  )
}
