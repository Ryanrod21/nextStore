import Image from 'next/image';
import '../app/globals.css';

function LogoImage() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        textAlign: 'center',
      }}
    >
      <Image
        src="/logo.png"
        fill
        alt="Logo"
        className="LogoImage"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

export default LogoImage;
