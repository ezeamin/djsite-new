import Link from 'next/link';

import DeleteDiscountCode from './DeleteDiscountCode';

import Grid from '@/components/ui/Grid/Grid';

import { PATHS } from '@/constants/paths';

import { koulen } from '@/styles/fonts';

import { DiscountCodeItemProps } from '@/components/interface/admin';

const DiscountCodeItem = (props: DiscountCodeItemProps) => {
  const { discountCode } = props;

  return (
    <article className="mb-3 rounded-xl bg-gray-200/50 p-3 text-center text-gray-700">
      <h2 className={`${koulen.className} -mb-1 text-2xl`}>
        {discountCode.code} - {discountCode.discount}%
      </h2>
      <div className="divider my-0" />
      {/* TODO: Botones de editar y eliminar */}
      <Grid container gap={2}>
        <Grid item xs={6}>
          <Link
            className={`three-d-button--primary btn w-full ${koulen.className} text-lg text-white`}
            href={`${PATHS.ADMIN.DISCOUNT_CODES}?id=${discountCode.id}`}
          >
            MODIFICAR
          </Link>
        </Grid>
        <Grid item xs={6}>
          <DeleteDiscountCode code={discountCode.code} id={discountCode.id} />
        </Grid>
      </Grid>
    </article>
  );
};
export default DiscountCodeItem;
