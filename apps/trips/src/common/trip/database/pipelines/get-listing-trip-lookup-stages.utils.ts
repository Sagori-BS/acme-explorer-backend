export const getListingTripLookupStages = (): any[] => {
  return [
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
    }
  ];
};
