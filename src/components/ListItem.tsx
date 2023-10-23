import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import {Product} from '../redux/slices/ProductSlice';
import {addToCart} from '../redux/slices/CartSlice';
import {useDispatch} from 'react-redux';

const ListItem = ({item}: {item: Product}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressItem = (param: Product) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ProductDetails',
        params: {data: param},
      }),
    );
  };
  const onPressCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
      }),
    );
  };

  return (
    <TouchableRipple
      onPress={() => onPressItem(item)}
      key={item.id}
      testID="product-item">
      <View style={styles.productCard}>
        <FastImage
          source={{uri: item.img}}
          style={styles.productItemImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <IconButton
          style={styles.shoppingCart}
          icon="shopping-outline"
          size={25}
          onPress={onPressCart}
          iconColor={'black'}
        />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },

  productInfo: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 5,
    color: 'red',
  },
  productItemImage: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  shoppingCart: {alignSelf: 'flex-end', paddingBottom: 10},
});

export default memo(ListItem);
