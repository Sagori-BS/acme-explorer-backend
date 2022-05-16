export const applicationsPerTripPipeline = [
  {
    $group: {
      _id: '$trip',
      countApplications: { $count: {} }
    }
  },
  {
    $group: {
      _id: 0,
      average: { $avg: '$countApplications' },
      min: { $min: '$countApplications' },
      max: { $max: '$countApplications' },
      std: { $stdDevSamp: '$countApplications' }
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
