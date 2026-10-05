import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductItem({ product, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.info} onPress={() => onToggle(product.id)} accessibilityRole="button">
        <Text style={styles.check}>{product.bought ? '✅' : '⬜'}</Text>
        <Text style={[styles.name, product.bought && styles.nameBought]}>
          {product.name}
          {product.quantity > 1 ? ` (x${product.quantity})` : ''}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(product.id)}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  info: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  check: { fontSize: 20, marginRight: 10 },
  name: { fontSize: 16, color: '#222', flexShrink: 1 },
  nameBought: { textDecorationLine: 'line-through', color: '#999' },
  deleteBtn: { backgroundColor: '#e53935', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  deleteText: { color: '#fff', fontWeight: '600' },
});