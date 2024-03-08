import { redirect } from 'next/navigation';

import DiscountCodeForm from '@/components/Admin/DiscountCodes/DiscountCodeForm';
import DiscountCodeList from '@/components/Admin/DiscountCodes/DiscountCodeList';
import Title from '@/components/Common/Title';

import { getDiscountCode } from '@/utilities';

import { PageProps } from '@/interface';

const DiscountCodesPage = async (props: PageProps) => {
  const { searchParams } = props;
  const discountCode = await getDiscountCode(searchParams.id);

  if (searchParams.id && !discountCode) {
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
