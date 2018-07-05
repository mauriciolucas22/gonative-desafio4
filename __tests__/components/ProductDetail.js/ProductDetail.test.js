import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import sinon from 'sinon';

import ProductDetail from '../../../src/pages/productDetail';
import { Creators as CartActions } from '../../../src/store/ducks/cart';

const mockStore = configureStore([]);

const initialState = {
  products: {
    selectedProduct: {
      image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
      qty: 2,
      name: 'Camiseta Hyperas Preta',
      brand: 'Quiksilver',
      price: 49.99,
    },
  },
};

describe('Product Detail Testing', () => {
  const store = mockStore(initialState);
  const navigateFn = sinon.spy();
  const navigation = {
    navigate: navigateFn,
    dispatch: () => {},
    state: { routeName: 'testRoute' },
  };
  function createWrapper() {
    return shallow(<ProductDetail navigation={navigation} />, { context: { store } });
  }

  it('have correct props', () => {
    const wrapper = createWrapper();
    expect(wrapper.prop('products')).toEqual(initialState.products);
  });

  it('have render correctly', () => {
    const { selectedProduct } = initialState.products;
    const wrapper = createWrapper();
    expect(wrapper.dive().find(ScrollView)).toHaveLength(1);
    expect(wrapper.dive().find(Image).prop('source')).toEqual({ uri: selectedProduct.image });
    expect(wrapper.dive().find(Text).contains(selectedProduct.name)).toBe(true);
    expect(wrapper.dive().find(Text).contains(selectedProduct.brand)).toBe(true);
    expect(wrapper.dive().find(Text).contains(selectedProduct.price)).toBe(true);
    expect(wrapper.dive().find(Text).contains('Adicionar ao Carrinho')).toBe(true);
    expect(wrapper.dive().find(TouchableOpacity)).toHaveLength(1);
  });

  it('can add to cart', () => {
    const wrapper = createWrapper();
    wrapper.dive().find(TouchableOpacity).simulate('press');
    expect(store.getActions()).toContainEqual(CartActions.addToCart(initialState.products.selectedProduct));
  })
});
