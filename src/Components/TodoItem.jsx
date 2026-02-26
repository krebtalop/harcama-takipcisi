import { useState, useRef, useEffect } from 'react'
import { FiTrash2, FiEdit3, FiX, FiSave } from 'react-icons/fi'
import { CATEGORIES, getCategoryInfo, formatCurrency } from '../Interfaces/Todo'

function TransactionItem({ transaction, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editDescription, setEditDescription] = useState(transaction.description)
  const [editAmount, setEditAmount] = useState(transaction.amount.toString())
  const [editCategory, setEditCategory] = useState(transaction.category)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSaveEdit = () => {
    const trimmed = editDescription.trim()
    const parsedAmount = parseFloat(editAmount)
    if (!trimmed || isNaN(parsedAmount) || parsedAmount <= 0) return

    onUpdate({
      ...transaction,
      description: trimmed,
      amount: parsedAmount,
      category: editCategory,
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditDescription(transaction.description)
    setEditAmount(transaction.amount.toString())
    setEditCategory(transaction.category)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit()
    if (e.key === 'Escape') handleCancelEdit()
  }

  const catInfo = getCategoryInfo(transaction.type, transaction.category)
  const isIncome = transaction.type === 'income'

  const formattedDate = new Date(transaction.createdAt).toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="group animate-slide-up rounded-xl border-2 bg-white border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 p-4">
        {/* Category Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
          isIncome ? 'bg-emerald-100' : 'bg-rose-100'
        }`}>
          {catInfo.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-1.5 rounded-lg border-2 border-primary-300
                             focus:border-primary-500 focus:ring-2 focus:ring-primary-100
                             outline-none text-gray-700"
                  placeholder="Açıklama"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₺</span>
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    onKeyDown={handleKeyDown}
                    min="0"
                    step="0.01"
                    className="w-full sm:w-32 pl-7 pr-3 py-1.5 rounded-lg border-2 border-primary-300
                               focus:border-primary-500 outline-none text-gray-700"
                  />
                </div>
              </div>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border-2 border-primary-300
                           focus:border-primary-500 outline-none text-gray-700
                           bg-white cursor-pointer"
              >
                {CATEGORIES[transaction.type].map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              <p className="text-gray-800 font-medium break-words">{transaction.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium ${
                  isIncome
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}>
                  {catInfo.label}
                </span>
                <span className="text-xs text-gray-400">{formattedDate}</span>
              </div>
            </div>
          )}
        </div>

        {/* Amount */}
        {!isEditing && (
          <div className="flex-shrink-0 text-right">
            <p className={`text-lg font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={!editDescription.trim() || !(parseFloat(editAmount) > 0)}
                className="p-2 rounded-lg text-primary-600 hover:bg-primary-50
                           disabled:text-gray-300 transition-colors"
                title="Kaydet"
              >
                <FiSave className="text-lg" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                title="İptal"
              >
                <FiX className="text-lg" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-primary-600
                           hover:bg-primary-50 transition-colors
                           opacity-0 group-hover:opacity-100"
                title="Düzenle"
              >
                <FiEdit3 className="text-lg" />
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
                className="p-2 rounded-lg text-gray-400 hover:text-rose-600
                           hover:bg-rose-50 transition-colors
                           opacity-0 group-hover:opacity-100"
                title="Sil"
              >
                <FiTrash2 className="text-lg" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
