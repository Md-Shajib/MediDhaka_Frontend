import { Mail, MapPinHouse, PhoneIncoming } from "lucide-react";

export default function FooterContact() {
  return (
    <>
      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3">Contact</h3>
        <div className="text-gray-600 text-sm space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <MapPinHouse size={16} /> <span>Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <PhoneIncoming size={16} /> <span>+880 123 456 789</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} /> <span>support@medidhaka.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
