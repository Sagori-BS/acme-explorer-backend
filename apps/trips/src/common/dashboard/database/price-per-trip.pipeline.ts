export const pricePerTripPipeline = [
  {
    $group: {
      _id: 0,
      average: { $avg: '$price' },
      min: { $min: '$price' },
      max: { $max: '$price' },
      std: { $stdDevSamp: '$price' }
    }
  },
  {
    $project: {
      _id: 0,
      average: 1,
      min: 1,
      max: 1,
      std: 1
    }
  }
];
