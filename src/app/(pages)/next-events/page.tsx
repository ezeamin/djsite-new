import Title from '@/components/Common/Title';

const NextEventsPage = () => {
  // fetch events
  const events = [];

  return (
    <>
      <Title title="Proximos eventos" />
      {/* <BudgetForm /> */}
      {events.length === 0 && (
        <section className="flex h-fit items-center justify-center px-2 py-32 text-center">
          <p>No hay eventos próximos 🥺</p>
        </section>
      )}
    </>
  );
};
export default NextEventsPage;
