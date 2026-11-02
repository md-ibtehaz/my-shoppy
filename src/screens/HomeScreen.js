
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* MyShoppy Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>MyShoppy</Text>

          <View style={styles.underline} />
        </View>

        {/* Shopping Banner */}
        <View style={styles.banner}>

          {/* Shopping Illustration */}
          <View style={styles.imageContainer}>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900'
              }}
              style={styles.bannerImage}
              resizeMode="cover"
            />

          </View>

          {/* Main Heading */}
          <Text style={styles.title}>
            Shop & Buy
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            Shopping is a bit of a relaxing hobby for me,
            which is sometimes troubling for the bank balance.
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  scrollContent: {
    flexGrow: 1
  },

  header: {
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },

  logo: {
    fontSize: 38,
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#527D78',
    letterSpacing: 1
  },

  underline: {
    width: 130,
    height: 3,
    backgroundColor: '#527D78',
    marginTop: 5,
    borderRadius: 5
  },

  banner: {
    flex: 1,
    minHeight: 650,
    backgroundColor: '#42E8E8',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 35
  },

  imageContainer: {
    width: '100%',
    height: Math.min(width * 0.95, 400),
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#B5F5F3'
  },

  bannerImage: {
    width: '100%',
    height: '100%'
  },

  title: {
    fontSize: 52,
    fontWeight: '900',
    color: '#006B60',
    marginBottom: 30
  },

  description: {
    fontSize: 19,
    lineHeight: 28,
    color: '#164F50'
  }

});
