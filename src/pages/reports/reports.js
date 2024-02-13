import { Add } from '@/components/Layout'
import { useState } from 'react'
import { BasicModal } from '@/layouts/BasicModal'
import { ReportForm } from '@/components/Reports'
import styles from './reports.module.css'

export default function Reports(props) {

  const { onReload } = props

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  return (

    <>

      <Add onOpenClose={onOpenClose} />

      <BasicModal show={show} onClose={onOpenClose} titleModalForm='Crear reporte'>
        <ReportForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} />
      </BasicModal>

    </>

  )
}
