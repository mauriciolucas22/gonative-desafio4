import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from './pages/home';
import Cart from './pages/cart';
import ProductDetail from './pages/productDetail';

import { colors } from './styles';

const stackNavOptions = {
  navigationOptions: {
    headerTintColor: colors.pink,
    headerBackTitle: null,
    headerTitleStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerStyle: {
      height: 54,
    },
  },
};

const tabNavOptions = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: colors.pink,
    inactivateTintColor: colors.grey,
    style: {
      backgroundColor: colors.white,
      height: 40,
      paddingTop: 20,
    },
  },
};

const Product = StackNavigator({
  Home: { screen: Home },
  ProductDetail: { screen: ProductDetail },
}, stackNavOptions);

const Checkout = StackNavigator({
  Cart: { screen: Cart },
}, stackNavOptions);

const Routes = TabNavigator({
  Product: { screen: Product },
  Checkout: { screen: Checkout },
}, tabNavOptions);

export default Routes;
