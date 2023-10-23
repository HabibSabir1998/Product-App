import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  clear,
  removeItem,
} from '../../redux/slices/CartSlice';
import {cartTotalPriceSelector} from '../../redux/selectors';
import Header from '../../components/Header';
import {RootState} from '../../redux/store';

interface CartItem {
  id: string;
  img: string;
  quantity: number;
  name: string;
  price: number;
}

const CartContainer = () => {
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: RootState) => state.cart.cartList,
  ) as CartItem[];
  const totalPrice: number = useSelector(cartTotalPriceSelector);

  const AlertItem = () => {
    Alert.alert(
      'Are you sure you want to clear the cart?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dispatch(clear())},
      ],
      {cancelable: false},
    );
  };

  const renderStoreItems = ({item}: {item: CartItem}) => {
    return (
      <View style={styles.storeItem}>
        <View style={styles.storeItemImg}>
          <Image
            style={styles.storeItemImage}
            source={{uri: item.img}}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.storeItemInfo}>
          <Text style={styles.storeItemTitle}>{item.name}</Text>
          <Text style={styles.storeItemPrice}>
            ${item.quantity * item.price}
          </Text>
          <View style={styles.addToCart}>
            <View style={styles.cartItemAmount}>
              <TouchableOpacity
                onPress={() => {
                  if (item.quantity === 1) {
                    dispatch(removeItem(item.id));
                    return;
                  } else {
                    dispatch(decrementQuantity(item.id));
                  }
                }}>
                <Text style={styles.cartItemAmountText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.cartItemAmountText}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(incrementQuantity(item.id));
                }}>
                <Text style={styles.cartItemAmountText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cartItemRemove}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(removeItem(item.id));
                }}
                style={styles.cartItemRemoveButton}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={cart}
        renderItem={renderStoreItems}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={() => (
          <View>
            <Header title="My Cart" />

            <TouchableOpacity onPress={AlertItem} style={styles.clearCart}>
              <Text style={styles.clearCartText}>Clear cart</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => {
          return (
            <View style={styles.cartFooter}>
              <View style={styles.checkout}>
                {cart.length === 0 ? (
                  <View style={styles.emptyCart}>
                    <Text>Your cart is empty</Text>
                  </View>
                ) : (
                  <View>
                    <View style={styles.cartTotal}>
                      <Text style={styles.cartTotalText}>Total</Text>
                      <Text style={styles.cartTotalText}>
                        ${totalPrice.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const Cart = () => {
  return <CartContainer />;
};

export default Cart;

const styles = StyleSheet.create({
  cartItemAmountText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  storeItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeItemImg: {
    width: '30%',
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  storeItemImage: {
    width: '100%',
    height: '100%',
  },
  storeItemInfo: {
    width: '70%',
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  storeItemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },
  storeItemTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  clearCartText: {
    fontSize: 16,
    color: 'white',
  },
  addToCart: {
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  cartItemRemove: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemRemoveButton: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartFooter: {
    justifyContent: 'space-between',
  },
  cartTotal: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  clearCart: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  checkout: {
    marginHorizontal: 20,
  },
  emptyCart: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  cartTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
