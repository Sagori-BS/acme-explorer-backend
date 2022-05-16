export const averageRangePricePipeline = [
  {
    $group: {
      _id: 0,
      minPrice: { $avg: '$minPrice' },
      maxPrice: { $avg: '$maxPrice' }
    }
  },
  {
    $project: {
      _id: 0,
      minPrice: 1,
      maxPrice: 1
    }
  }
];
