
import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';

import products from '../data/products.json';

export default function CategoryItems({ route, navigation }) {

  const categoryName = route?.params?.categoryName || '';

  const { addToCart } = useContext(CartContext);

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString('en-IN')}`;
  };

  // Add product and show simple popup
  const handleAddToCart = (item) => {

    addToCart(item);

    Alert.alert(
      'Added to Cart',
      `${item.name} added successfully!`,
      [
        {
          text: 'OK',
          style: 'default'
        }
      ]
    );
  };

  // Filter products by category
  const filteredProducts = categoryName
    ? products.filter(
        item =>
          item.category?.toLowerCase() === categoryName.toLowerCase()
      )
    : [];

  // Render product card
  const renderProduct = ({ item }) => (

    <View style={styles.productCard}>

      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productDetails}>

        <Text
          style={styles.productName}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <Text style={styles.productPrice}>
          {formatPrice(item.price)}
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}
    >

      {categoryName ? (

        <>

          <Text style={styles.heading}>
            {categoryName}
          </Text>

          <Text style={styles.subtitle}>
            Explore our {categoryName.toLowerCase()} collection
          </Text>

          {filteredProducts.length > 0 ? (

            <FlatList
              data={filteredProducts}
              keyExtractor={item => String(item.id)}
              renderItem={renderProduct}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />

          ) : (

            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No products found in this category.
              </Text>
            </View>

          )}

        </>

      ) : (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyText}>
            Please select a category first.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </TouchableOpacity>

        </View>

      )}

    </SafeAreaView>

  );
}

// Styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1A535C',
    marginTop: 15
  },

  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginTop: 6,
    marginBottom: 20
  },

  listContent: {
    paddingBottom: 25
  },

  row: {
    justifyContent: 'space-between'
  },

  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 4
  },

  productImage: {
    width: '100%',
    height: 145,
    backgroundColor: '#EEEEEE'
  },

  productDetails: {
    padding: 11
  },

  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    minHeight: 38
  },

  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A535C',
    marginTop: 5,
    marginBottom: 12
  },

  addButton: {
    backgroundColor: '#1A535C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  emptyText: {
    color: '#888888',
    fontSize: 15,
    textAlign: 'center'
  },

  backButton: {
    backgroundColor: '#1A535C',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15
  },

  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }

});
