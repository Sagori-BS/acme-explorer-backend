export const nearOperationFormatter = (point: {
  longitude: number;
  latitude: number;
}) => {
  const { latitude, longitude } = point;
  const nearOperation = {
    $maxDistance: 20000,
    $geometry: { type: 'Point', coordinates: [longitude, latitude] },
  };

  return nearOperation;
};
