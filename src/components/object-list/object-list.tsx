import cn from 'classnames';
import type { Coordinates, Data } from '../../types/types';
import { OFF, ON } from '../../const/const';

type ObjectListProps = {
  data: Data;
  onItemClick?: (coords: Coordinates) => void;
};

function ObjectList({ data, onItemClick }: ObjectListProps) {
  return (
    <section className="flex flex-1 p-5 border-t border-gray-600 min-h-0">
      <ul className=" flex flex-col min-h-0 gap-4 overflow-y-auto">
        {
          data && data.map(
            ({ id, name, address, coords, mode }) => (
              <li key={id} className='cursor-pointer hover:opacity-75' onClick={() => onItemClick?.(coords)}>
                <article>
                  <span
                    className={
                      cn(
                        "flex justify-start items-center pl-5 font-bold relative before:content-[''] before:absolute before:w-4 before:h-4 before:left-0 before:rounded-[50%]",
                        {
                          "before:bg-green-500": mode === ON,
                          "before:bg-gray-400": mode === OFF,
                        }
                      )
                    }
                  >
                    {name}
                  </span>
                  <p className="text-gray-700">{address}</p>
                  <span className="text-gray-400">Статус: {mode === 'on' ? 'Активный' : 'Неактивный'}</span>
                </article>
              </li>
            ))}
      </ul>
    </section>
  )
}

export default ObjectList;