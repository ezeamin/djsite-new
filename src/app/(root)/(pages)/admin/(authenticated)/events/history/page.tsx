import EventList from '@/components/Admin/Common/EventList';
import Title from '@/components/Common/Title';

const PastEventsView = () => {
  return (
    <>
      <Title title="Eventos pasados" />
      <EventList finished />
    </>
  );
};

export default PastEventsView;
