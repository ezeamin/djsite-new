import Image from 'next/image';

const Balls = () => {
  return (
    <div>
      <Image
        alt="bola azul decorativa"
        className="bg-ball fixed left-[-50px] top-[60px] -z-10"
        height={100}
        src="/img/oval.webp"
        width={100}
      />
      <Image
        alt="bola azul decorativa"
        className="bg-ball fixed right-[-50px] top-[100px] -z-10"
        height={150}
        src="/img/oval.webp"
        width={150}
      />
      <Image
        alt="bola azul decorativa"
        className="bg-ball fixed bottom-[100px] left-[-10px] -z-10"
        height={100}
        src="/img/oval.webp"
        width={100}
      />
    </div>
  );
};
export default Balls;
