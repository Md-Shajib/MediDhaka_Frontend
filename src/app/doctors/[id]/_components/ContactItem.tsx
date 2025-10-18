interface ContactItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

export default function ContactItem({
  icon: Icon,
  label,
  value,
}: ContactItemProps) {
  return (
    <>
      <div className="flex items-start space-x-4 p-4 border-b border-gray-100 last:border-b-0">
        <Icon className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-500">{label}</span>
          <span className="text-lg font-medium text-gray-800 break-words">
            {value}
          </span>
        </div>
      </div>
    </>
  );
}
