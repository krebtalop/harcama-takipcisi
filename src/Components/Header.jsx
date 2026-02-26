import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi'
import { formatCurrency } from '../Interfaces/Todo'

function Header({ totalIncome, totalExpense }) {
  const balance = totalIncome - totalExpense

  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-200">
          <FiDollarSign className="text-2xl text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Harcama <span className="text-primary-600">Takipçisi</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
        <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <FiTrendingUp className="text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Gelir</span>
          </div>
          <p className="text-xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
              <FiTrendingDown className="text-rose-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Gider</span>
          </div>
          <p className="text-xl font-bold text-rose-600">{formatCurrency(totalExpense)}</p>
        </div>

        <div className={`rounded-2xl p-5 border-2 shadow-sm ${
          balance >= 0
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-rose-50 border-rose-200'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              balance >= 0 ? 'bg-emerald-200' : 'bg-rose-200'
            }`}>
              <FiDollarSign className={balance >= 0 ? 'text-emerald-700' : 'text-rose-700'} />
            </div>
            <span className="text-sm font-medium text-gray-500">Bakiye</span>
          </div>
          <p className={`text-xl font-bold ${
            balance >= 0 ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
