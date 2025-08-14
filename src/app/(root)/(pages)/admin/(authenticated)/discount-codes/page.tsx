import { redirect } from 'next/navigation';

import DiscountCodeForm from '@/components/Admin/DiscountCodes/DiscountCodeForm';
import DiscountCodeList from '@/components/Admin/DiscountCodes/DiscountCodeList';
import Title from '@/components/Common/Title';

import { getDiscountCode } from '@/utilities';

const DiscountCodesPage = async (props: ServerComponentProps) => {
  const { searchParams } = await props;
  const { id } = await searchParams;

  const discountCode = await getDiscountCode(id);

  if (id && !discountCode) {
    redirect('/admin/discount-codes');
  }

  return (
    <>
      <Title title="Cod. de descuento" />
      <DiscountCodeForm discountCode={discountCode} />
      <DiscountCodeList />
    </>
  );
};
export default DiscountCodesPage;
