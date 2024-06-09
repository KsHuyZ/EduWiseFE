export const formatPrice = (price?: number) => {
  if (!price) return 'Free';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};
