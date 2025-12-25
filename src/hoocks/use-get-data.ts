import { useEffect } from "react";
import { DATA_URL } from "../const/const";
import type { Data } from "../types/types";

function useGetData(
  dataSetter: React.Dispatch<React.SetStateAction<Data>>,
  loadingStatusSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
      fetch(DATA_URL)
        .then(
          (response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
  
            return response.json()
          }
        )
        .then((jsonData) => {
          dataSetter(jsonData);
          loadingStatusSetter(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          dataSetter([]);
          loadingStatusSetter(false);
        });
    }, [dataSetter, loadingStatusSetter]);
}

export default useGetData;
