import DiscountCodeItem from './DiscountCodeItem';

import { getDiscountCodes } from '@/utilities';

const DiscountCodeList = async () => {
  const discountCodes = await getDiscountCodes();

  if (discountCodes.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh_-_550px)] items-center justify-center px-2 text-center">
        <p>No hay códigos cargados 🤑</p>
      </div>
    );
  }

  return (
    <section className="mt-3">
      {discountCodes.map((code) => (
        <DiscountCodeItem discountCode={code} key={code.id} />
      ))}
    </section>
  );
};
export default DiscountCodeList;
