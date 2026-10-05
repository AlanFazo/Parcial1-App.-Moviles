import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getProducts, saveProducts } from '../storage/storage';
import { validateProductName } from '../utils/validation';

export default function AddProductScreen({ navigation }) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');

  const handleSave = async () => {
    const check = validateProductName(name);
    if (!check.valid) {
      setError(check.error);
      return;
    }
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const list = await getProducts(user);
    const newProduct = { id: Date.now().toString(), name: name.trim(), quantity: qty, bought: false };
    await saveProducts(user, [...list, newProduct]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} placeholder="Ej: Leche" value={name} onChangeText={setName} />
      <Text style={styles.label}>Cantidad</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f4f6f8' },
  label: { fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#2e7d32', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  error: { color: '#c62828', marginBottom: 10 },
});