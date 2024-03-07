import Link from 'next/link';

import { PATHS } from '@/constants/paths';

import { koulen } from '@/styles/fonts';

const NotFoundPage = () => {
  return (
    <section className="py-5 pt-28 text-center">
      <h2 className={`${koulen.className} text-3xl`}>¡Perdon! 😶</h2>
      <p>No pude encontrar la página que estabas buscando</p>
      <p className="mt-3">¿Te parece si volvemos a inicio?</p>
      <Link className="btn mt-3" href={PATHS.HOME}>
        Ir a Inicio
      </Link>
    </section>
  );
};
export default NotFoundPage;
