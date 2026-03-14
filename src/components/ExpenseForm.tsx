import { useState, type FormEvent } from 'react'
import type { Category, Currency, Expense } from '../types'

interface ExpenseFormProps {
  categories: Category[]
  currencies: Currency[]
  onSubmit: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void> | void
  isSubmitting: boolean
}

const getTodayDate = () => new Date().toISOString().split('T')[0]

export function ExpenseForm({
  categories,
  currencies,
  onSubmit,
  isSubmitting,
}: ExpenseFormProps) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>(categories[0])
  const [currency, setCurrency] = useState<Currency>(currencies[0])
  const [date, setDate] = useState(getTodayDate())

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedAmount = Number(amount)
    if (!name.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return
    }

    await onSubmit({
      name: name.trim(),
      amount: parsedAmount,
      category,
      currency,
      date,
    })

    setName('')
    setAmount('')
    setCategory(categories[0])
    setCurrency(currencies[0])
    setDate(getTodayDate())
  }

  return (
    <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Add Expense</h2>
        <p className="text-sm text-slate-500">Log your latest spend</p>
      </div>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Expense name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Groceries"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Amount
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Currency
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as Currency)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type="date"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="md:col-span-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-2.5 font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
        >
          {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
        </button>
      </form>
    </section>
  )
}
