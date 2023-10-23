import React, {FC, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator, Badge, FAB, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {Product, fetchProducts} from '../../redux/slices/ProductSlice';
import {RootState} from '../../redux/store';
import ListItem from '../../components/ListItem';
import {CustomDialog} from '../../components/CustomDialog';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface ProductListProps {
  navigation: NavigationProp<ParamListBase>;
}
const ProductList: FC<ProductListProps> = ({navigation}) => {
  const cart = useSelector((state: RootState) => state.cart.cartList);

  const dispatch = useDispatch();
  const {fetchError, isLoading, products} = useSelector(
    (rootState: RootState) => rootState.products,
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (fetchError) {
      setVisible(true);
    }
  }, [fetchError]);

  const hideDialog = () => setVisible(false);

  const renderProductItem = ({item}: {item: Product}) => {
    return <ListItem item={item} />;
  };

  const renderListFooter = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          color="blue"
          testID="loading-indicator"
        />
      );
    } else {
      return null;
    }
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.wrapper}>
        {!isLoading && <Text testID="pull-text">Data Not Found</Text>}
      </View>
    );
  };

  const RenderList = useMemo(() => {
    return (
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyComponent}
        testID="products-flatlist"
      />
    );
  }, [products]);

  return (
    <View style={styles.container} testID="product-list-container">
      <Header title="Products" hasBack={false} />
      {RenderList}

      <View pointerEvents={'none'} style={styles.badge}>
        {cart?.length ? <Badge testID="badge">{cart.length}</Badge> : null}
      </View>
      <FAB
        icon="cart"
        style={styles.fab}
        onPress={() => navigation.navigate('Cart')}
        testID="fab-button"
      />

      <CustomDialog
        visible={visible}
        hideDialog={hideDialog}
        text={fetchError}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {paddingBottom: 50, marginHorizontal: 10},
  button: {
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  badge: {
    position: 'absolute',
    elevation: 20,
    bottom: 58,
    right: 18,
    zIndex: 1,
  },
});
