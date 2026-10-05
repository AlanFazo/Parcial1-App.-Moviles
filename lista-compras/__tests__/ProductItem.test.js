import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductItem from '../src/components/ProductItem';

const product = { id: '1', name: 'Leche', quantity: 2, bought: false };

describe('ProductItem', () => {
  test('renderiza nombre y cantidad', () => {
    const { getByText } = render(<ProductItem product={product} onToggle={() => {}} onDelete={() => {}} />);
    expect(getByText('Leche (x2)')).toBeTruthy();
  });

  test('llama a onDelete con el id al tocar Eliminar', () => {
    const onDelete = jest.fn();
    const { getByText } = render(<ProductItem product={product} onToggle={() => {}} onDelete={onDelete} />);
    fireEvent.press(getByText('Eliminar'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});