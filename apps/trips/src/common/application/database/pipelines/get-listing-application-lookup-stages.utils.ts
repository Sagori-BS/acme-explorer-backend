export const getListingTripLookupStages = (): any[] => {
  return [
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'explorer',
        as: 'explorer'
      }
    },
    {
      $addFields: {
        explorer: {
          $first: '$explorer'
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'manager',
        as: 'manager'
      }
    },
    {
      $addFields: {
        manager: {
          $first: '$manager'
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
