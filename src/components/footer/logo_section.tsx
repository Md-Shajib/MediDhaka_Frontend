import Image from "next/image";

export default function LogoSection() {
  return (
    <>
      <div className="flex flex-col items-center md:items-start gap-5">
        <Image
          src="/images/medi-logo.png"
          alt="MediDhaka"
          width={200}
          height={100}
        />
        <p className="text-gray-600 text-sm">
          Your trusted healthcare platform — find doctors, hospitals, and
          medical services across Dhaka.
        </p>
      </div>
    </>
  );
}
