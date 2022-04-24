export const getListingSponsorshipLookupStages = (): any[] => {
  return [
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'sponsor',
        as: 'sponsor'
      }
    },
    {
      $addFields: {
        sponsor: {
          $first: '$sponsor'
        }
      }
    },
    {
      $lookup: {
        from: 'trips',
        foreignField: '_id',
        localField: 'trip',
        as: 'trip'
      }
    },
    {
      $addFields: {
        explorer: {
          $first: '$trip'
        }
      }
    }
  ];
};
