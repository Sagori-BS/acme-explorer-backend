export const ratioOfApplicationGroupByStatePipeline = [
  {
    $group: {
      _id: null,
      totalCount: {
        $count: {}
      },
      data: {
        $push: '$$ROOT'
      }
    }
  },
  {
    $unwind: '$data'
  },
  {
    $group: {
      _id: '$data.state',
      stateCount: { $count: {} },
      totalCount: {
        $first: '$totalCount'
      }
    }
  },
  {
    $project: {
      _id: 0,
      state: '$_id',
      ratio: {
        $round: [
          {
            $multiply: [{ $divide: ['$stateCount', '$totalCount'] }, 100]
          },
          2
        ]
      }
    }
  }
];
