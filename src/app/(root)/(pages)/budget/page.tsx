// import BudgetForm from '@/components/Budget/BudgetForm';
import Title from '@/components/Common/Title';

// import { getBusyDates, getMessage } from '@/utilities';

export const revalidate = 14400; // 4 * 60 * 60

const BudgetPage = async () => {
  // const busyDatesPromise = getBusyDates();
  // const messagePromise = getMessage();

  // const [busyDates, message] = await Promise.all([
  //   busyDatesPromise,
  //   messagePromise,
  // ]);

  return (
    <>
      <Title title="Presupuestar" />
      {/* {message && (
        <p className="mb-2 rounded bg-yellow-200/25 px-3 py-2 text-sm">
          <b>Mensaje nuevo:</b> {message}
        </p>
      )}
      <BudgetForm busyDates={busyDates} /> */}
      <p>¡Hola! :D</p>
      <p className="mt-2">
        Gracias por llegar hasta acá, valoro mucho que consideres mi servicio
        para tu evento.
      </p>
      <p className="mt-2">
        Actualmente, y hasta junio del 2025, <b>no estaré tomando eventos</b>{' '}
        por motivos personales.
      </p>
      <p className="mt-2">
        Si tu evento es después de esa fecha, por favor contactame directamente
        por WhatsApp desde el menú principal.
      </p>
      <p className="mt-2">Nos vemos en la pista 🫡</p>
    </>
  );
};
export default BudgetPage;
