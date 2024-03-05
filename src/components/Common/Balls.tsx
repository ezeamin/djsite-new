import Image from 'next/image';

const Balls = () => {
  return (
    <div>
      <Image
        priority
        alt="bola azul decorativa"
        className="bg-ball fixed left-[-50px] top-[60px] -z-10 md:left-[-10px]"
        height={100}
        src="/img/oval.webp"
        width={100}
      />
      <Image
        priority
        alt="bola azul decorativa"
        className="bg-ball fixed right-[-50px] top-[100px] -z-10 md:right-[50px]"
        height={150}
        src="/img/oval.webp"
        width={150}
      />
      <Image
        priority
        alt="bola azul decorativa"
        className="bg-ball fixed bottom-[100px] left-[-10px] -z-10 md:left-[150px]"
        height={100}
        src="/img/oval.webp"
        width={100}
      />
    </div>
  );
};
export default Balls;
