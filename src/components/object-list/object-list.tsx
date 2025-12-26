import cn from 'classnames';
import type { Coordinates, Data } from '../../types/types';
import { ITEM_HEIGHT, OFF, ON } from '../../const/const';
import { useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

type ObjectListProps = {
  data: Data;
  onItemClick?: (coords: Coordinates) => void;
};

function ObjectList({ data, onItemClick }: ObjectListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const getItemKey = useCallback(
    (index: number) => data[index].id,
    [data]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    measureElement: (el) => el.getBoundingClientRect().height,
    getItemKey,
    gap: 10,
  })


  if (!data || !data.length) {
    return (
      <div className="flex items-center justify-center text-gray-400">
        Объекты не найдены
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="relative min-h-0 w-full overflow-auto"
    >
      <ul className={`relative min-h-0 w-full h-full`} >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = data[virtualRow.index];

          return (
            <li
              data-index={virtualRow.index}
              key={item.id}
              ref={rowVirtualizer.measureElement}
              className="w-full box-border cursor-pointer absolute hover:opacity-75"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
              onClick={() => onItemClick?.(item.coords)}
            >
              <article>
                <span
                  className={cn(
                    "flex items-center pl-5 font-bold relative before:absolute before:w-4 before:h-4 before:left-0 before:rounded-full",
                    {
                      "before:bg-green-500": item.mode === ON,
                      "before:bg-gray-400": item.mode === OFF,
                    }
                  )}
                >
                  {item.name}
                </span>
                <p className="text-gray-700">{item.address}</p>
                <span className="text-gray-400">
                  Статус: {item.mode === ON ? 'Активный' : 'Неактивный'}
                </span>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ObjectList;
