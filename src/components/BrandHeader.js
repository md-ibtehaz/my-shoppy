import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

export default function BrandHeader({
  centered = true,
  showRightIcons = false,
  showBack = false,
  onBack,
}) {
  return (
    <View
      style={[
        styles.headerContainer,
        centered ? styles.headerCentered : styles.headerLeft,
      ]}
    >
      {/* Optional Back Button */}
      {showBack && (
        <TouchableOpacity
          style={[styles.backButton, centered && styles.backButtonAbsolute]}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      )}

      {/* High-Resolution Brand Logo */}
      <View style={[styles.logoWrapper, centered && styles.logoCentered]}>
        <Image
          source={require('../../assets/brand-logo.png')}
          style={centered ? styles.brandLogoCentered : styles.brandLogoLeft}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xs,
    backgroundColor: COLORS.surface,
    minHeight: 48,
    position: 'relative',
  },
  headerCentered: {
    justifyContent: 'center',
  },
  headerLeft: {
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  backButtonAbsolute: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 10,
    marginRight: 0,
  },
  logoWrapper: {
    justifyContent: 'center',
  },
  logoCentered: {
    alignItems: 'center',
  },
  brandLogoLeft: {
    width: 116,
    height: 36,
  },
  brandLogoCentered: {
    width: 132,
    height: 42,
  },
});
