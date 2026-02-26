import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { CATEGORIES } from '../Interfaces/Todo'

function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')

  const handleTypeChange = (newType) => {
    setType(newType)
    setCategory(CATEGORIES[newType][0].key)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = description.trim()
    const parsedAmount = parseFloat(amount)
    if (!trimmed || isNaN(parsedAmount) || parsedAmount <= 0) return

    onAdd({
      id: crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2),
      type,
      description: trimmed,
      amount: parsedAmount,
      category,
      createdAt: new Date().toISOString(),
    })

    setDescription('')
    setAmount('')
    setCategory(CATEGORIES[type][0].key)
  }

  const isValid = description.trim() && parseFloat(amount) > 0

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in bg-white rounded-2xl border-2 border-gray-100 p-5 shadow-sm">
      {/* Type Toggle */}
      <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
            ${type === 'income'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Gelir
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
            ${type === 'expense'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Gider
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama..."
          className="px-4 py-3 rounded-xl border-2 border-gray-200
                     focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                     outline-none transition-all duration-200 text-gray-700
                     placeholder:text-gray-400 bg-white"
        />
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₺</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full pl-9 pr-4 py-3 rounded-xl border-2 border-gray-200
                       focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                       outline-none transition-all duration-200 text-gray-700
                       placeholder:text-gray-400 bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200
                     focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                     outline-none transition-all duration-200 text-gray-700
                     bg-white cursor-pointer"
        >
          {CATEGORIES[type].map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!isValid}
          className={`px-6 py-3 font-semibold rounded-xl shadow-lg
                      transition-all duration-200 flex items-center
                      justify-center gap-2 active:scale-95
                      disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none
            ${type === 'income'
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 hover:shadow-emerald-300'
              : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200 hover:shadow-rose-300'
            }`}
        >
          <FiPlus className="text-lg" />
          <span>Ekle</span>
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
