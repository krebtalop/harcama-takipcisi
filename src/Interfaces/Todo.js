/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {'income' | 'expense'} type
 * @property {string} description
 * @property {number} amount
 * @property {string} category
 * @property {string} createdAt - ISO date string
 */

export const CATEGORIES = {
  income: [
    { key: 'salary', label: 'Maaş', icon: '💰' },
    { key: 'freelance', label: 'Serbest Çalışma', icon: '💻' },
    { key: 'investment', label: 'Yatırım', icon: '📈' },
    { key: 'gift', label: 'Hediye', icon: '🎁' },
    { key: 'other_income', label: 'Diğer Gelir', icon: '💵' },
  ],
  expense: [
    { key: 'food', label: 'Yiyecek', icon: '🍔' },
    { key: 'transport', label: 'Ulaşım', icon: '🚌' },
    { key: 'bills', label: 'Faturalar', icon: '🧾' },
    { key: 'shopping', label: 'Alışveriş', icon: '🛍️' },
    { key: 'entertainment', label: 'Eğlence', icon: '🎬' },
    { key: 'health', label: 'Sağlık', icon: '🏥' },
    { key: 'education', label: 'Eğitim', icon: '📚' },
    { key: 'rent', label: 'Kira', icon: '🏠' },
    { key: 'other_expense', label: 'Diğer Gider', icon: '📦' },
  ],
}

export const FILTER_OPTIONS = {
  all: 'Tümü',
  income: 'Gelir',
  expense: 'Gider',
}

export function getCategoryInfo(type, categoryKey) {
  const list = CATEGORIES[type] || []
  return list.find((c) => c.key === categoryKey) || { key: categoryKey, label: categoryKey, icon: '📌' }
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(amount)
}
