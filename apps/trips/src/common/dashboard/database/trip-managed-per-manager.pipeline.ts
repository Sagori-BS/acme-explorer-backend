export const tripManagedPerManagerPipeline = [
  {
    $group: {
      _id: '$manager',
      countTrips: { $count: {} }
    }
  },
  {
    $group: {
      _id: 0,
      average: { $avg: '$countTrips' },
      min: { $min: '$countTrips' },
      max: { $max: '$countTrips' },
      std: { $stdDevSamp: '$countTrips' }
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
