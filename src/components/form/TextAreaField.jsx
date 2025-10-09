import { MapPin } from "lucide-react";

export default function TextAreaField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-start gap-2 mt-1 px-3 py-2 border rounded-md bg-white focus-within:ring-2 focus-within:ring-[#FB6B00]">
        <MapPin size={18} className="text-gray-400 mt-1" />
        <textarea
          name={name}
          rows={2}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="w-full text-sm text-gray-800 outline-none resize-none"
        />
      </div>
    </div>
  );
}
