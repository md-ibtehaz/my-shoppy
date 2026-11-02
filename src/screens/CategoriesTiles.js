
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 54) / 2;

const categories = [
  {
    id: '1',
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=85'
  },
  {
    id: '2',
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=85'
  },
  {
    id: '3',
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=85'
  },
  {
    id: '4',
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=85'
  },
  {
    id: '5',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=85'
  }
];

export default function CategoriseTiles({ navigation }) {

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProducts', {
      categoryName: category.name
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <Text style={styles.heading}>
            Explore Categories
          </Text>

          <Text style={styles.subtitle}>
            Find everything you need in one place.
          </Text>
        </View>

        <View style={styles.categoryGrid}>

          {categories.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              activeOpacity={0.85}
              onPress={() => handleCategoryPress(item)}
            >

              <ImageBackground
                source={{ uri: item.image }}
                style={styles.categoryImage}
                imageStyle={styles.imageStyle}
                resizeMode="cover"
              >

                <View style={styles.bottomOverlay}>
                  <Text style={styles.categoryName}>
                    {item.name.toUpperCase()}
                  </Text>
                </View>

              </ImageBackground>

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 25
  },

  header: {
    marginTop: 20,
    marginBottom: 25
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1A535C',
    marginBottom: 8
  },

  subtitle: {
    fontSize: 15,
    color: '#888888'
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  categoryCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.48,
    marginBottom: 18,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#DDDDDD',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },

  categoryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },

  imageStyle: {
    borderRadius: 22
  },

  bottomOverlay: {
    height: 85,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.58)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },

  categoryName: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center'
  }

});
