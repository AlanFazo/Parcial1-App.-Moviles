import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { getProducts, saveProducts } from '../storage/storage';
import { formatSummary, summarize } from '../utils/validation';
import { scheduleShoppingReminder } from '../utils/notifications';
import ProductItem from '../components/ProductItem';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getProducts(user).then(setProducts);
    }, [user])
  );

  const update = async (list) => {
    setProducts(list);
    await saveProducts(user, list);
  };

  const toggle = (id) => update(products.map((p) => (p.id === id ? { ...p, bought: !p.bought } : p)));
  const remove = (id) => update(products.filter((p) => p.id !== id));

  const remind = async () => {
    const ok = await scheduleShoppingReminder(summarize(products).pending, 10);
    Alert.alert(ok ? 'Recordatorio programado' : 'Sin permiso', ok ? 'Te avisamos en 10 segundos.' : 'Habilitá las notificaciones.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hola, {user} 👋</Text>
      <Text style={styles.summary}>{formatSummary(products)}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item} onToggle={toggle} onDelete={remove} />}
        ListEmptyComponent={<Text style={styles.empty}>Agregá tu primer producto</Text>}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      <TouchableOpacity style={[styles.btn, styles.primary]} onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.btnText}>+ Agregar producto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={remind}>
        <Text style={styles.btnText}>🔔 Recordarme en 10 s</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f6f8' },
  hello: { fontSize: 20, fontWeight: 'bold' },
  summary: { fontSize: 15, color: '#555', marginTop: 4 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  btn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  primary: { backgroundColor: '#2e7d32' },
  secondary: { backgroundColor: '#1565c0' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  logout: { color: '#c62828', textAlign: 'center', marginTop: 14, marginBottom: 6 },
});