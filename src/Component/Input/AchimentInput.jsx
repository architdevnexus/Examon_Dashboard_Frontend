export const StatInput = ({ label, name, value, editable, onChange }) => (
  <div className="flex flex-col items-center w-full">
    <label className="text-center text-base font-medium text-gray-700 mb-2">
      {label}
    </label>

    <input
      type="number"
      name={name}
      value={value}
      disabled={!editable}
      min={0}
      onChange={onChange}
      className="text-center border border-gray-300 rounded-sm px-3 py-2 w-full"
      required
    />
  </div>
);
