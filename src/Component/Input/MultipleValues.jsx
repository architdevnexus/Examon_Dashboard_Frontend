const MultipleValues = ({
  label,
  name,
  placeholder,
  formData,
  valueArray,
  maxLength = 20,
  valueArrayString,
  setFormData,
  onchange,
}) => {
  // Add value
  const onAdd = () => {
    const t = formData[name].trim();
    if (!t) return;

    setFormData((prev) => ({
      ...prev,
      [valueArrayString]: [...prev[valueArrayString], t],
      [name]: "",
    }));
  };

  // Remove value
  const onRemove = (value) => {
    setFormData((prev) => ({
      ...prev,
      [valueArrayString]: prev[valueArrayString].filter((t) => t !== value),
    }));
  };

  return (
    <div>
      <label className="font-medium mb-2 block">{label}</label>

      <div className="flex gap-2">
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={onchange}
          maxLength={maxLength}
          className="flex-1 p-2 border rounded-lg"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {valueArray.map((value) => (
          <span
            key={value}
            className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm flex items-center gap-2"
          >
            {value}
            <button
              type="button"
              onClick={() => onRemove(value)}
              className="font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultipleValues;
