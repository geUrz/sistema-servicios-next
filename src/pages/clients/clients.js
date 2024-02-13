import { useState } from 'react'
import { BasicLayout } from '@/layouts'
import { FaCog } from 'react-icons/fa'
import { ClientForm, ListClient } from '@/components/Client'
import { Add, TitleTopBar } from '@/components/Layout'
import { BasicModal } from '@/layouts/BasicModal'
import styles from './clients.module.css'

export default function Clients(props) {

  const { onReload } = props

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  return (

    <BasicLayout relative categorie='Clientes'>

      <Add onOpenClose={onOpenClose} />

      <div className={styles.containerMainClient}>
        <div className={styles.containerClient}>
        <TitleTopBar title='Clientes' />
          <div className={styles.boxListClient}>
            <div className={styles.boxRow}>
              <div>
                <h1>Cliente</h1>
              </div>
              <div>
                <h1>Contacto</h1>
              </div>
              <div>
                <h1>Celular</h1>
              </div>
              <div>
                <h1>Dirección</h1>
              </div>
              <div>
                <FaCog />
              </div>
            </div>
            <ListClient />
          </div>
        </div>
      </div>

      <BasicModal show={show} onClose={onOpenClose} titleModalForm='Crear cliente'>
        <ClientForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} />
      </BasicModal>

    </BasicLayout>

  )
}
