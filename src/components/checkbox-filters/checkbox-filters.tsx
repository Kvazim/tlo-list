import type { FiltersState } from "../../types/types";

type CheckboxFiltersProps = {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

function CheckboxFilters({ filters, onChange }: CheckboxFiltersProps) {
  const { showOn, showOff } = filters;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange({
      ...filters,
      [name]: checked ? true : false
    });
  };

  return (
    <fieldset className="flex flex-col gap-1">
      <label className="flex gap-2">
        <input type="checkbox" id="showOn" name="showOn" checked={showOn} onChange={handleCheckboxChange} />
        Активные
      </label>
      <label className="flex gap-2">
        <input type="checkbox" id="showOff" name="showOff" checked={showOff} onChange={handleCheckboxChange} />
        Не активные
      </label>
    </fieldset>
  );
}

export default CheckboxFilters;
