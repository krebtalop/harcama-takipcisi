import { useState, useEffect, useMemo } from 'react'
import Header from '../Components/Header'
import TransactionForm from '../Components/TodoForm'
import TransactionFilter from '../Components/TodoFilter'
import TransactionList from '../Components/TodoList'

const STORAGE_KEY = 'expense-tracker-data'

function loadTransactions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function HomePage() {
  const [transactions, setTransactions] = useState(loadTransactions)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  const handleAdd = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const handleUpdate = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    )
  }

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  )

  const totalExpense = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  )

  const counts = useMemo(() => ({
    all: transactions.length,
    income: transactions.filter((t) => t.type === 'income').length,
    expense: transactions.filter((t) => t.type === 'expense').length,
  }), [transactions])

  const filteredTransactions = useMemo(() => {
    if (filter === 'income') return transactions.filter((t) => t.type === 'income')
    if (filter === 'expense') return transactions.filter((t) => t.type === 'expense')
    return transactions
  }, [transactions, filter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <Header totalIncome={totalIncome} totalExpense={totalExpense} />

        <div className="space-y-6">
          <TransactionForm onAdd={handleAdd} />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <TransactionFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              counts={counts}
            />

            {transactions.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Tüm işlemleri silmek istediğinize emin misiniz?')) {
                    setTransactions([])
                  }
                }}
                className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
              >
                Tümünü temizle
              </button>
            )}
          </div>

          <TransactionList
            transactions={filteredTransactions}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>

        <footer className="mt-12 text-center text-sm text-gray-400">
          <p>React + Tailwind CSS ile geliştirildi</p>
        </footer>
      </div>
    </div>
  )
}

export default HomePage
