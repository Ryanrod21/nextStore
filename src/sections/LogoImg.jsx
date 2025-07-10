import Image from 'next/image';
import '../app/globals.css';

function LogoImage({ sizes }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100px',
        height: '80px',
        textAlign: 'center',
      }}
    >
      <Image
        src="/logo.png"
        fill
        alt="Logo"
        className="LogoImage"
        style={{ objectFit: 'contain' }}
        sizes={sizes}
        priority
      />
    </div>
  );
}

export default LogoImage;
