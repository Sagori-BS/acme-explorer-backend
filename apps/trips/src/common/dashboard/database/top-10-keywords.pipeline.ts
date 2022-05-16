export const top10KeywordsPipeline = [
  {
    $group: {
      _id: '$keyword',
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      keyword: '$_id',
      count: 1
    }
  },
  { $sort: { count: -1 } },
  { $limit: 10 }
];
