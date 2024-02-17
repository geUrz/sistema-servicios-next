import { Image } from "semantic-ui-react";
import styles from "./BudgetPDF.module.css";
import { formatDate } from "@/helpers";
import { AddConcept } from "./Concept/AddConcept";
import { ListConcept } from "./ListConcept";

export function BudgetPDF(props) {
  const { id } = props;

  const budget = id.data.attributes;
  const budgetId = id.data.id;

  return (
    <div className={styles.containerMainPDF}>
      <div>
        <div className={styles.boxTop}>
          <div>
            <h1>ClickNet</h1>
            <h2>Punta Este Corporativo</h2>
            <h2>Calzada Carranza 951,</h2>
            <h2>Piso 10 Suite 304, Interior "E"</h2>
            <h2>C.P. 2125</h2>
            <h1>Juan Roberto Espinoza Espinoza</h1>
            <h2>RFC: EIEJ8906244J3</h2>
          </div>
          <div>
            <Image src="/img/logo.png" />
          </div>
        </div>

        <div className={styles.boxMid}>
          <div className={styles.boxMidUno}>
            <h1>{!id ? budget.client : "<desconocido>"}</h1>
            <h2>{!id ? budget.contact : "<desconocido>"}</h2>
          </div>

          <div className={styles.boxMidDos}>
            <div className={styles.boxMidDos1}>
              <h1>{!id ? `${budget.typedocument}` : "<desconocido>"}</h1>
            </div>
            <div className={styles.boxMidDos2}>
              <div>
                <h1>{!id ? `${budget.typedocument} #` : "<desconocido>"}</h1>
                <h1>Fecha:</h1>
              </div>
              <div>
                <h2>000{!id ? budget.invoicenumber : "<desconocido>"}</h2>
                <h2>{!id ? formatDate(budget.publishedAt) : "<desconocido>"}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.boxLow}>
          <div className={styles.boxRowUno}>
            <div>
              <h1>Artículo</h1>
            </div>
            <div>
              <h1>Descripción</h1>
            </div>
            <div>
              <h1>Qty</h1>
            </div>
            <div>
              <h1>P. Unitario</h1>
            </div>
            <div>
              <h1>Total</h1>
            </div>
          </div>
          <div className={styles.boxRowDos}>
            <ListConcept budgetId={budgetId} />
          </div>
          <div className={styles.boxRowTres}>
            <AddConcept budgetId={budgetId} />
          </div>
        </div>
      </div>
    </div>
  );
}
