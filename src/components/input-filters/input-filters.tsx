import type { FiltersState } from "../../types/types";

type InputFiltersProps = {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

function InputFilters({ filters, onChange }: InputFiltersProps) {
  const { name, address } = filters;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleInputChange}
        placeholder="Поиск по названию"
        className="w-full p-2 border border-gray-600 rounded"
      />
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={handleInputChange}
        placeholder="Поиск по адресу"
        className="w-full p-2 border border-gray-600 rounded"
      />
    </fieldset>
  );
}

export default InputFilters;
