import { Budgets } from "@/api";
import { BudgetPDF } from "@/components/Budget";

export default function Budget(props) {
  const { id } = props;

  return <BudgetPDF id={id} />;
}
export async function getServerSideProps(context) {
  const {
    params: { id },
  } = context;

  const idCtrl = new Budgets();
  const response = await idCtrl.getById(id);

  return {
    props: {
      id: response,
    },
  };
}
