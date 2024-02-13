import { BasicLayout } from '@/layouts'
import { ListBudget, PreBudgetForm } from '@/components/Budget'
import { FaCog } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Add, CountStatus, TitleTopBar } from '@/components/Layout'
import { Budgets as BudgetsApi } from '@/api'
import { size } from 'lodash'
import { BasicModal } from '@/layouts/BasicModal'
import styles from './budgets.module.css'

const ctrlBudget = new BudgetsApi()

export default function Budgets(props) {

  const { onReload } = props

  const [show, setShow] = useState(false)

  const onOpenClose = () => setShow((prevState) => !prevState)

  const [budget, setBudget] = useState([])
 
  const countAll = size(budget);
  const countinProcess = size(budget.filter(item => item.attributes.status=='En proceso'));
  const countFinished = size(budget.filter(item=>item.attributes.status=='Realizada'));


  useEffect(() => {
    ( async () => {
      try {
        const response = await ctrlBudget.getAll()
        setBudget(response.data)
      } catch (error) {
          console.error(error)
      }
    })()
  }, [])

  return (

    <BasicLayout relative categorie='Cotizaciones'>

      <Add onOpenClose={onOpenClose} />
     
      <div className={styles.containerMainService}>
        <div className={styles.containerBudget}>
          <TitleTopBar title='Cotizaciones' />
          <CountStatus
        count={{countAll, countinProcess, countFinished}}
          all= 'Todas'
          inProcess= 'En proceso'
          finished= 'Realizada'
        />
          <div className={styles.boxListBudget}>
            <div className={styles.boxRow}>
              <div>
                <h1>Cliente</h1>
              </div>
              <div>
                <h1>Descripción</h1>
              </div>
              <div>
                <h1>Documento</h1>
              </div>
              <div>
                <FaCog />
              </div>
            </div>
            <ListBudget />
          </div>
        </div>
      </div>

      <BasicModal show={show} onClose={onOpenClose} titleModalForm='Crear pre-cotización'>
        <PreBudgetForm onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} />
      </BasicModal>

    </BasicLayout>

  )
}
