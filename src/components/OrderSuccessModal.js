import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function OrderSuccessModal({
  visible,
  transactionId,
  onContinueShopping,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onContinueShopping}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Glowing Aura Ring & Green Checkmark */}
          <View style={styles.auraRing}>
            <View style={styles.greenCircle}>
              <Ionicons name="checkmark" size={38} color="#FFFFFF" />
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.title}>Your order has been accepted</Text>

          {/* Transaction ID */}
          <Text style={styles.transactionText}>
            Transaction ID: {transactionId || '8984294820'}
          </Text>

          {/* Orange Continue Shopping Button */}
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={onContinueShopping}
            activeOpacity={0.88}
          >
            <Text style={styles.continueText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  auraRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 6,
    borderColor: '#F0FDF4',
  },
  greenCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  transactionText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  continueBtn: {
    backgroundColor: '#FE6B0B', // Exact vibrant orange from reference image
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    ...SHADOWS.sm,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
