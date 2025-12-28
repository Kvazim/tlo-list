import { useEffect, useState } from "react";
import { DATA_URL } from "../const/const";
import type { Data } from "../types/types";

function useGetData() {
  const [data, setData] = useState<Data>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch(DATA_URL)
        .then(
          (response) => {
            console.log(response)
            if (!response.ok) {
              throw new Error('Response not ok');
            }
  
            return response.json()
          }
        )
        .then((jsonData) => {
          setData(jsonData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError(error)
          setData([]);
          setLoading(false);
        });
    }, []);
    
  return { data, loading, error };
}

export default useGetData;
