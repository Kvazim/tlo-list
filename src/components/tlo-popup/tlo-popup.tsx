import { Popup } from "react-leaflet";
import type { DataItem } from "../../types/types";
import { ON } from "../../const/const";
type TloPopupProps = {
  item: DataItem;
};

function TloPopup({ item }: TloPopupProps) {
    return (
      <Popup>
        <span
          className="flex justify-start items-center font-bold"
        >
          {item.name}
        </span>
        <p className="text-gray-700">{item.address}</p>
        <span className="text-gray-400">
          Статус:&nbsp;
          <span className={item.mode === ON ? 'text-green-600' : 'text-red-600'} >
            {item.mode === ON ? 'Активный' : 'Неактивный'}
          </span>
        </span>
      </Popup>
    );
}

export default TloPopup;
