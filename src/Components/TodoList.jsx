import TransactionItem from './TodoItem'
import { FiInbox } from 'react-icons/fi'

function TransactionList({ transactions, onUpdate, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <FiInbox className="text-3xl text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">Henüz işlem yok</p>
        <p className="text-gray-400 text-sm mt-1">Gelir veya gider ekleyerek başlayın</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <TransactionItem
          key={t.id}
          transaction={t}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TransactionList
