import { validateCredentials, validateProductName, formatSummary } from '../src/utils/validation';

describe('validaciones', () => {
  test('rechaza credenciales cortas y acepta válidas', () => {
    expect(validateCredentials('ab', '1234').valid).toBe(false);
    expect(validateCredentials('juan', '12').valid).toBe(false);
    expect(validateCredentials('juan', '1234').valid).toBe(true);
  });

  test('rechaza nombre de producto vacío', () => {
    expect(validateProductName('   ').valid).toBe(false);
    expect(validateProductName('Pan').valid).toBe(true);
  });

  test('formatSummary cuenta pendientes', () => {
    expect(formatSummary([])).toBe('Tu lista está vacía');
    expect(formatSummary([{ bought: false }, { bought: true }])).toBe('1 pendiente de 2');
    expect(formatSummary([{ bought: true }])).toBe('¡Todo comprado!');
  });
});