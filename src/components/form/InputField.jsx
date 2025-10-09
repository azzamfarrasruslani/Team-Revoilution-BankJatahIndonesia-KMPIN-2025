import { Mail, Lock, User, Phone } from "lucide-react";

const icons = {
  email: Mail,
  password: Lock,
  nama: User,
  no_hp: Phone,
};

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  const Icon = icons[name] || null;

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 mt-1 px-3 py-2 border rounded-md bg-white focus-within:ring-2 focus-within:ring-[#FB6B00]">
        {Icon && <Icon size={18} className="text-gray-400" />}
        <input
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full text-sm text-gray-800 outline-none"
        />
      </div>
    </div>
  );
}
