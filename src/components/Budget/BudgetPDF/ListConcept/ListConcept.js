import { useEffect, useState } from "react";
import { Loading } from "@/components/Layout/Loading";
import { map, size } from "lodash";
import { Concepts } from "@/api";
import { Concept } from "./Concept";
import { ListEmpty } from "@/components/Layout/ListEmpty";
import styles from "./ListConcept.module.css";

const conceptsCtrl = new Concepts();

export function ListConcept(props) {
  const { reload, onReload, budgetId } = props;

  const [listconcepts, setListconcepts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await conceptsCtrl.filterByBudget(budgetId);
        setListconcepts(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return (
    <>
      {!listconcepts ? (
        <Loading />
      ) : size(listconcepts) === 0 ? (
        <ListEmpty />
      ) : (
        <>
          <div className={styles.mainListsong}>
            {map(listconcepts, (listconcept) => (
              <Concept key={listconcept.id} conceptId={listconcept.id} concept={listconcept.attributes} onReload={onReload} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
