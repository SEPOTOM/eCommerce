const testData = {
  token: 'wVSutjlPgAmKbqL-xDBSE4bb0DbiYd73',
  productJSON: [
    {
      id: 'ab39b246-c292-4e50-94d6-3b2b61ee2e28',
      key: 'toyota-camry',
      masterData: {
        current: {
          categories: [{ id: 'e4d9460c-e9e9-4294-ae1d-6cbb1a9f0900' }],
          name: { 'en-US': 'Toyota Camry' },
          description: { 'en-US': 'Toyota Camry description' },
          masterVariant: {
            images: [
              {
                url: 'https://e41280370799329dd100-b13dec0b5961a0938699b5c240b595be.ssl.cf3.rackcdn.com/camry-ocean-yTyyF6f0.jpg',
              },
            ],
            attributes: [{ name: 'color', value: 'White' }],
            availability: { isOnStock: true },
            prices: [
              {
                value: {
                  centAmount: 2900098,
                  currencyCode: 'USD',
                },
                discounted: {
                  value: {
                    centAmount: 2700000,
                  },
                },
              },
            ],
          },
        },
      },
    },
  ],
  singleCategoryJSON: [
    {
      name: { 'en-US': 'Category without product' },
      key: 'without-product',
      id: 'cf0ecae7-81a3-4702-a35a-68cb065290af',
      parent: {
        id: '5a64b445-8662-4959-a874-dc666cd26335',
      },
    },
  ],
  bodyRequest: {
    method: 'GET',
    headers: {
      Authorization: 'Bearer wVSutjlPgAmKbqL-xDBSE4bb0DbiYd73',
    },
  },
  createProductsLinks: {
    result: [{ link: '/toyota-camry', productId: 'ab39b246-c292-4e50-94d6-3b2b61ee2e28' }],
  },
  createRouteCategoryLinks: {
    result: [
      { text: 'Category without product', link: '/without-product' },
      { text: 'About us', link: '/about-us' },
    ],
  },
  createMenuLevel1: {
    result: [
      {
        text: 'Category without product',
        link: '/without-product',
        categoryId: '5a64b445-8662-4959-a874-dc666cd26335',
        children: [],
      },
    ],
  },
  createMenuLevel2: {
    result: [
      {
        text: 'Category without product',
        link: '/without-product',
        categoryId: 'cf0ecae7-81a3-4702-a35a-68cb065290af',
        parentId: '5a64b445-8662-4959-a874-dc666cd26335',
      },
    ],
  },
};

export default testData;
