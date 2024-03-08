import BudgetForm from '@/components/Budget/BudgetForm';
import Title from '@/components/Common/Title';

import { getBusyDates, getMessage } from '@/utilities';

const BudgetPage = async () => {
  const busyDatesPromise = getBusyDates();
  const messagePromise = getMessage();

  const [busyDates, message] = await Promise.all([
    busyDatesPromise,
    messagePromise,
  ]);

  return (
    <>
      <Title title="Presupuestar" />
      {message && (
        <p className="mb-2 rounded bg-yellow-200/25 px-3 py-2 text-sm">
          <b>Mensaje nuevo:</b> {message}
        </p>
      )}
      <BudgetForm busyDates={busyDates} />
    </>
  );
};
export default BudgetPage;
