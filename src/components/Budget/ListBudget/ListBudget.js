import { useEffect, useState } from 'react'
import { Loading } from '@/components/Layout/Loading'
import { map, size } from 'lodash'
import { Budgets } from '@/api'
import { Budget } from './Budget'
import { ListEmpty } from '@/components/Layout/ListEmpty'
import styles from './ListBudget.module.css'

const listbudgetCtrl = new Budgets()

export function ListBudget(props) {

  const { reload, onReload } = props

  const [listbudgets, setListBudgets] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await listbudgetCtrl.getAll()
        setListBudgets(response.data)

      } catch (error) {
        console.error(error)
      }
      
    })()
    
  }, [reload])


  return (
    
    <>
      {!listbudgets  ? (
        <Loading />
      ) :
      size(listbudgets) === 0 ? (
        <ListEmpty />
      ) : (
        <>
        <div className={styles.mainListsong}>
          {map(listbudgets, (listbudget) => (
            <Budget
              key={listbudget.id} 
              budgetId={listbudget.id}
              budget={listbudget.attributes}  
              onReload={onReload}
            />
          ))}
        </div>
      </>
      )} 
    </>

  )
}
