import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BasicModal } from "@/layouts/BasicModal";
import { ConceptForm } from "../ConceptForm";
import styles from "./AddConcept.module.css";

export function AddConcept(props) {
  const { onReload } = props;

  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <div className={styles.addConcept} onClick={onOpenClose}>
        <FaPlus />
        <h1>Crear concepto</h1>
      </div>

      <BasicModal show={show} onClose={onOpenClose} titleModalForm="Crear concepto">
        <ConceptForm budgetId={props.budgetId} onClose={onOpenClose} onOpenClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </>
  );
}
