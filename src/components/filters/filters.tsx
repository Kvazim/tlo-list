import type { FiltersState } from "../../types/types";
import CheckboxFilters from "../checkbox-filters/checkbox-filters";
import InputFilters from "../input-filters/input-filters";

type FiltersProps = {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

function Filters({ filters, onChange }: FiltersProps) {
  const handleSortClick = () => {
    onChange({
      ...filters,
      sortAsc: !filters.sortAsc,
    });
  }
  return (
    <form className="flex flex-col gap-5">
      <InputFilters filters={filters} onChange={onChange} />
      <CheckboxFilters filters={filters} onChange={onChange} />
      <button
        type="button"
        onClick={handleSortClick}
        className="flex w-full p-2 border border-gray-400 rounded-sm bg-gray-200 justify-center items-center cursor-pointer hover:opacity-60"
      >
        Сортировать по&nbsp;номеру (по&nbsp;возрастанию)
      </button>
    </form>
  )
}

export default Filters;