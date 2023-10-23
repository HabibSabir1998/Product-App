import React, {FC} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import Header from '../../components/Header';
import DetailItem from '../../components/DetailItem';
import {MainFeedNavigatorParamList} from '../../navigations/MainProductStack';

const ProductDetails: FC<
  NativeStackScreenProps<MainFeedNavigatorParamList, 'ProductDetails'>
> = ({route}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <Header title="Product Details" />
      <ScrollView style={styles.content}>
        <FastImage
          source={{uri: data.img}}
          style={styles.image}
          resizeMode="contain"
        />
        <DetailItem keyword="Name" value={data.name} />
        <DetailItem keyword="Price" value={data.price} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default ProductDetails;
