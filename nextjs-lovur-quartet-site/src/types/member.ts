export interface Member {
    _id: string;
    name: string;
    position: string;
    description: string;
    photo: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
    slug: {
      current: string;
    };
  }
