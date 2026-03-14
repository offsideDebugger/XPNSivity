import { ExpenseItem } from './ExpenseItem'
import type { Expense } from '../types'

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => Promise<void> | void
  deletingExpenseId: string | null
  isLoading: boolean
}

export function ExpenseList({
  expenses,
  onDelete,
  deletingExpenseId,
  isLoading,
}: ExpenseListProps) {
  return (
    <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Expense List</h2>
        <span className="text-sm text-slate-500">Newest first</span>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
          Loading expenses...
        </div>
      ) : expenses.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          No expenses yet. Add your first expense to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-700">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Currency</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={onDelete}
                  isDeleting={deletingExpenseId === expense.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
