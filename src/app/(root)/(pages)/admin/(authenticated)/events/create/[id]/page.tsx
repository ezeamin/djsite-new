import CreateEventForm from '@/components/Admin/Event/CreateEventForm';
import Title from '@/components/Common/Title';

import { getEvent } from '@/utilities';

import { CreateEventSchema } from '@/forms/schemas/createEventSchema';

const EditEventPage = async (props: ServerComponentProps) => {
  const { params } = await props;
  const { id } = await params;

  const event = await getEvent(id);

  // TODO: Add error handling
  if (!event) {
    return null;
  }

  const eventToModify: CreateEventSchema & { id: string } = {
    id: event.id,
    date: event.date,
    location: event.location,
    service: event.service as 'Basico' | 'Parlantes',
    time: event.time as 'Dia' | 'Noche',
    title: event.title,
    clientName: event.client.name,
    clientPhone: event.client.phone,
    startTime: event.startTime,
    endTime: event.endTime,
    observations: event.observations,
    paid: event.paid,
    price: event.price,
  };

  return (
    <>
      <Title title="Editar evento" />
      <CreateEventForm eventToModify={eventToModify} />
    </>
  );
};
export default EditEventPage;
