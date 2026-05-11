export const buildProjectQuery = (query) => {
  const filter = {};
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { shortDescription: { $regex: query.search, $options: 'i' } },
      { technologies: { $regex: query.search, $options: 'i' } },
      { tags: { $regex: query.search, $options: 'i' } }
    ];
  }
  if (query.category) filter.category = query.category;
  if (query.technology) filter.technologies = { $regex: query.technology, $options: 'i' };
  if (query.status) filter.status = query.status;
  if (query.featured) filter.featured = query.featured === 'true';
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  return filter;
};

export const getSort = (sort) => {
  const map = {
    newest: '-createdAt',
    oldest: 'createdAt',
    popular: '-views',
    priceLow: 'price',
    priceHigh: '-price'
  };
  return map[sort] || '-createdAt';
};
