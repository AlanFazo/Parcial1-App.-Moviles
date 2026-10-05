export function validateCredentials(username, password) {
  if (!username || username.trim().length < 3) {
    return { valid: false, error: 'El usuario debe tener al menos 3 caracteres' };
  }
  if (!password || password.length < 4) {
    return { valid: false, error: 'La contraseña debe tener al menos 4 caracteres' };
  }
  return { valid: true, error: null };
}

export function validateProductName(name) {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'El nombre del producto es obligatorio' };
  }
  return { valid: true, error: null };
}

export function summarize(products) {
  const total = products.length;
  const bought = products.filter((p) => p.bought).length;
  return { total, bought, pending: total - bought };
}

export function formatSummary(products) {
  const { total, pending } = summarize(products);
  if (total === 0) return 'Tu lista está vacía';
  if (pending === 0) return '¡Todo comprado!';
  return `${pending} pendiente${pending === 1 ? '' : 's'} de ${total}`;
}