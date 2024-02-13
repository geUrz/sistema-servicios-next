import { BasicLayout } from "@/layouts"
import { BoxCat } from "@/components/Home/BoxCat"
import { FaClipboard, FaEdit, FaFile, FaPaperclip, FaUser, FaUserFriends } from "react-icons/fa"
import styles from './panel.module.css'

export default function Panel() {  

  return (
    <BasicLayout relative categorie='Panel'>

      <div className={styles.containerCat}>
        <div>
          <BoxCat link='/tasks' categorie='Tareas'>
            <FaPaperclip />
          </BoxCat>

          <BoxCat link='/services' categorie='Servicios'>
            <FaClipboard />
          </BoxCat>

          <BoxCat link='/budgets' categorie='Cotizaciones'>
            <FaFile />
          </BoxCat>

          <BoxCat link='/reports' categorie='Reportes'>
            <FaEdit />
          </BoxCat>

          <BoxCat link='/clients' categorie='Clientes'>
            <FaUser />
          </BoxCat>

          <BoxCat link='/users' categorie='Usuarios'>
            <FaUserFriends />
          </BoxCat>
        </div>
      </div>
      
    </BasicLayout>
  )
}
