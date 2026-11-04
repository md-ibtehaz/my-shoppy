import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

export default function BrandHeader({
  centered = false,
  showRightIcons = true,
  showBack = false,
  onBack,
}) {
  return (
    <View style={[styles.headerContainer, centered && styles.headerCentered]}>
      {/* Optional Back Button */}
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      )}

      {/* Brand Logo with stylish underline and dot */}
      <View style={[styles.logoWrapper, centered && styles.logoCentered]}>
        <Text style={styles.brandTitle}>MyShoppy</Text>
        <View style={styles.underlineRow}>
          <View style={styles.underlineBar} />
          <View style={styles.underlineDot} />
        </View>
      </View>

      {/* Right System & Profile Icons */}
      {!centered && showRightIcons && (
        <View style={styles.rightIconsGroup}>
          <Ionicons
            name="battery-charging-outline"
            size={24}
            color={COLORS.primary}
            style={styles.iconItem}
          />
          <Ionicons
            name="cellular-outline"
            size={20}
            color={COLORS.primary}
            style={styles.iconItem}
          />
          <Ionicons
            name="person-circle"
            size={26}
            color={COLORS.primary}
            style={styles.iconItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    minHeight: 52,
  },
  headerCentered: {
    justifyContent: 'center',
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
  logoWrapper: {
    alignItems: 'flex-start',
  },
  logoCentered: {
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '800',
    fontStyle: 'italic',
    color: COLORS.primary,
    letterSpacing: -0.6,
  },
  underlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  underlineBar: {
    width: 62,
    height: 2.2,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  underlineDot: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
    marginLeft: 2,
  },
  rightIconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconItem: {
    marginLeft: 2,
  },
});
