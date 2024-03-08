import BudgetForm from '@/components/Budget/BudgetForm';
import Title from '@/components/Common/Title';

import { getBusyDates } from '@/utilities';

const BudgetPage = async () => {
  // fetch message (alert)
  const busyDates = await getBusyDates();

  return (
    <>
      <Title title="Presupuestar" />
      <BudgetForm busyDates={busyDates} />
    </>
  );
};
export default BudgetPage;
