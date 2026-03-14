import type { Expense } from '../types'

interface ExpenseItemProps {
  expense: Expense
  onDelete: (id: string) => Promise<void> | void
  isDeleting: boolean
}

const formatDate = (dateValue: string) =>
  new Date(dateValue).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export function ExpenseItem({ expense, onDelete, isDeleting }: ExpenseItemProps) {
  return (
    <tr className="border-b border-slate-100 hover:bg-sky-50/60">
      <td className="px-4 py-3 font-medium text-slate-800">{expense.name}</td>
      <td className="px-4 py-3 text-slate-600">{expense.category}</td>
      <td className="px-4 py-3 text-slate-700">{expense.amount.toFixed(2)}</td>
      <td className="px-4 py-3 text-slate-600">{expense.currency}</td>
      <td className="px-4 py-3 text-slate-600">{formatDate(expense.date)}</td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onDelete(expense.id)}
          disabled={isDeleting}
          className="rounded-md bg-orange-100 px-3 py-1.5 text-sm font-semibold text-orange-700 hover:bg-orange-200 disabled:cursor-not-allowed disabled:bg-orange-50 disabled:text-orange-400"
          aria-label={`Delete ${expense.name}`}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </td>
    </tr>
  )
}
