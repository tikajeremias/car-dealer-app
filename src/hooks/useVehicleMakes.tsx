import { useEffect, useState } from 'react';

const useVehicleMakes = () => {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        );
        const data = await response.json();
        setMakes(data.Results);
      } catch {
        //@ts-expect-error
        setError('Error fetching makes');
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  return { makes, loading, error };
};

export default useVehicleMakes;
