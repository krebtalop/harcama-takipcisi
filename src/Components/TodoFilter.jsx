import { FILTER_OPTIONS } from '../Interfaces/Todo'

function TransactionFilter({ currentFilter, onFilterChange, counts }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {Object.entries(FILTER_OPTIONS).map(([key, label]) => {
        const count = counts[key] ?? 0
        const isActive = currentFilter === key

        let activeClass = 'bg-primary-600 text-white shadow-md shadow-primary-200'
        if (isActive && key === 'income') activeClass = 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
        if (isActive && key === 'expense') activeClass = 'bg-rose-500 text-white shadow-md shadow-rose-200'

        return (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive
                ? activeClass
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {label}
            <span
              className={`ml-1.5 inline-flex items-center justify-center
                          min-w-[20px] h-5 px-1 rounded-full text-xs font-bold
                ${isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-500'
                }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default TransactionFilter
