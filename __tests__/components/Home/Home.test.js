import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { FlatList, View, ActivityIndicator } from 'react-native';
import sinon from 'sinon';

import Home from '../../../src/pages/home';
import { Creators as CategoriesActions } from '../../../src/store/ducks/categories';
import { Creators as ProductsActions } from '../../../src/store/ducks/products';


const mockStore = configureStore([]);

const initialState = {
  categories: {
    categories: [
      {
        id: 1,
        title: 'Camisetas',
      },
      {
        id: 2,
        title: 'Camisas',
      },
    ],
    activeCategory: {
      id: 1,
      title: 'Camisetas',
    },
    loading: false,
    error: null,
  },
  products: {
    products: [
      {
        image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
        name: 'Camiseta Hyperas Preta',
        brand: 'Quiksilver',
        price: 49.99,
        id: 1,
      },
      {
        name: 'Camiseta Double Tap Preta',
        brand: 'Quiksilver',
        image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
        price: 59.99,
      },
    ],
    loading: false,
    error: null,
    selectedProduct: {},
  },
};

const loadingState = {
  categories: {
    categories: [],
    activeCategory: {},
    loading: true,
    error: null,
  },
  products: {
    products: [],
    loading: true,
    error: null,
    selectedProduct: {},
  },
};

const navigateFn = sinon.spy();
const navigation = {
  navigate: navigateFn,
  dispatch: function() {},
  state: { routeName: 'testRoute' },
};

describe('Home tests', () => {
  const store = mockStore(initialState);
  function createWrapper() {
    return shallow(<Home navigation={navigation} />, { context: { store } });
  }

  it('it renders correctly', () => {
    const wrapper = createWrapper();
    const { categories: { categories }, products: { products } } = initialState;

    expect(wrapper.dive().find(View)).toHaveLength(1);
    expect(wrapper.dive().find(FlatList)).toHaveLength(2);
    expect(wrapper.dive().find(ActivityIndicator)).toHaveLength(0);
    expect(wrapper.dive().find({ id: 'categoriesList' }).prop('data')).toEqual(categories);
    expect(wrapper.dive().find({ id: 'productsList' }).prop('data')).toEqual(products);
    expect(wrapper.dive().find({ id: 'categoriesList' }).props().keyExtractor(categories[0])).toEqual('1');
    expect(wrapper.dive().find({ id: 'productsList' }).props().keyExtractor(products[0])).toEqual('1');

    // expect(wrapper.dive().find({ id: 'categoriesList' }).props().renderItem(categories))
    //   .toEqual(<CategoryItems
    //     changeCategory={changeCat}
    //     repo={undefined}
    //     selectedCategory={initialState.categories.activeCategory}
    //   />);
    // expect(wrapper.dive().find({ id: 'productsList' }).props().renderItem(products[0]))
    //   .toEqual(<ProductItem
    //     navigateToProduct={navigateToProduct}
    //     product={undefined}
    //   />);

    expect(store.getActions()).toContainEqual(CategoriesActions.getCategoriesRequest());
  });

  it('it shows loading components', () => {
    const emptystore = mockStore(loadingState);
    const wrapper = shallow(<Home navigation={navigation} />, { context: { store: emptystore } });

    expect(wrapper.dive().find(View)).toHaveLength(1);
    expect(wrapper.dive().find(FlatList)).toHaveLength(0);
    expect(wrapper.dive().find(ActivityIndicator)).toHaveLength(2);
  });

  it('it triggers navigateToProduct', async () => {
    const wrapper = createWrapper();

    wrapper.dive().instance().navigateToProduct(initialState.products.products[0]);
    await expect(store.getActions()).toContainEqual(ProductsActions.setSelectedProduct(initialState.products.products[0]));
    expect(navigateFn.calledOnce).toBe(true);
  });

});
