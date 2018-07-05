import React from 'react';
import { shallow } from 'enzyme';
import { Text, Image, TouchableOpacity, TextInput } from 'react-native';
import configureStore from 'redux-mock-store';

import CartItem from '../../../src/pages/cart/components/CartItem';
import { Creators as CartActions } from '../../../src/store/ducks/cart';

const mockStore = configureStore([]);

const product = {
  image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
  qty: 2,
  name: 'Camiseta Hyperas Preta',
  brand: 'Quiksilver',
  price: 49.99,
};


describe('Cart tests', () => {
  const store = mockStore({});
  function createWrapper() {
    return shallow(<CartItem product={product} />, { context: { store } });
  }

  it('Should have correct props', () => {
    const wrapper = createWrapper();

    expect(wrapper.dive().state('qty')).toEqual(product.qty);
    expect(wrapper.prop('product')).toEqual(product);
  });

  it('Should render correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.dive().find(Image).prop('source')).toEqual({ uri: product.image });
    expect(wrapper.dive().find(Text).contains(product.brand)).toBe(true);
    expect(wrapper.dive().find(Text).contains(product.name)).toBe(true);
    expect(wrapper.dive().find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.dive().find(Text).contains('X')).toBe(true);
  });

  it('Should be able to Remove from Cart', () => {
    const wrapper = createWrapper();
    wrapper.dive().find(TouchableOpacity).simulate('press');
    expect(store.getActions()).toContainEqual(CartActions.removeFromCart(product));
  });

  it('Should be able to update Qty', () => {
    const wrapper = createWrapper();
    expect(wrapper.dive().state('qty')).toEqual(product.qty);

    wrapper.dive().find(TextInput).simulate('changeText', '4');
    expect(store.getActions()).toContainEqual(CartActions.updateQty(4, product));
  });

  it('Should be able to update Qty', () => {
    const wrapper = createWrapper();
    expect(wrapper.dive().state('qty')).toEqual(product.qty);

    wrapper.dive().find(TextInput).simulate('changeText', 'ZA');
    expect(store.getActions()).toContainEqual(CartActions.updateQty(0, product));
  });
});
