import CreateEventForm from '@/components/Admin/Event/CreateEventForm';
import Title from '@/components/Common/Title';

const EditEventPage = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  return (
    <>
      <Title title="Editar evento" />
      <CreateEventForm />
    </>
  );
};
export default EditEventPage;
