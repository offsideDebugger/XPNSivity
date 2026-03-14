import { useEffect, useMemo, useState } from 'react'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { CurrencySelector } from './components/CurrencySelector'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { TotalCard } from './components/TotalCard'
import type { Category, Currency, Expense } from './types'

type CurrencyRates = Partial<Record<Currency, number>>

const categories: Category[] = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
]

const currencies: Currency[] = ['USD', 'INR', 'EUR', 'GBP', 'JPY']

const convertExpenseToBaseCurrency = (
  amount: number,
  expenseCurrency: Currency,
  baseCurrency: Currency,
  rates: CurrencyRates,
) => {
  if (expenseCurrency === baseCurrency) {
    return amount
  }

  const rateFromBase = rates[expenseCurrency]

  if (!rateFromBase || rateFromBase <= 0) {
    return amount
  }

  return amount / rateFromBase
}

function App() {
  const [baseCurrency, setBaseCurrency] = useState<Currency>('USD')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isSubmittingExpense, setIsSubmittingExpense] = useState(false)
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({ USD: 1 })
  const [rateLoading, setRateLoading] = useState(false)
  const [rateError, setRateError] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPageLoading(false)
    }, 500)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    let isCancelled = false

    setRateLoading(true)
    setRateError(false)

    const symbols = currencies.filter((currency) => currency !== baseCurrency).join(',')

    fetch(`https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${symbols}`)
      .then(r => r.json())
      .then(data => {
        if (isCancelled) {
          return
        }

        setCurrencyRates({
          ...data.rates,
          [baseCurrency]: 1,
        })
        setRateLoading(false)
      })
      .catch(() => {
        if (isCancelled) {
          return
        }

        setRateError(true)
        setRateLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [baseCurrency])

  const addExpense = async (expenseInput: Omit<Expense, 'id' | 'createdAt'>) => {
    setErrorMessage(null)
    setIsSubmittingExpense(true)

    try {
  
      setExpenses((prev) => [
        {
          ...expenseInput,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        },
        ...prev,
      ])
    } catch {
      setErrorMessage('Unable to add expense right now. Please try again.')
    } finally {
      setIsSubmittingExpense(false)
    }
  }

  const deleteExpense = async (id: string) => {
    setErrorMessage(null)
    setDeletingExpenseId(id)

    try {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    } catch {
      setErrorMessage('Unable to delete expense right now. Please try again.')
    } finally {
      setDeletingExpenseId(null)
    }
  }

  const sortedExpenses = useMemo(
    () =>
      [...expenses].sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime() ||
          b.createdAt - a.createdAt,
      ),
    [expenses],
  )

  const convertedTotal = useMemo(
    () =>
      expenses.reduce(
        (sum, expense) =>
          sum +
          convertExpenseToBaseCurrency(
            expense.amount,
            expense.currency,
            baseCurrency,
            currencyRates,
          ),
        0,
      ),
    [baseCurrency, currencyRates, expenses],
  )

  const breakdownByCategory = useMemo(
    () =>
      categories.map((category) => ({
        category,
        total: expenses
          .filter((expense) => expense.category === category)
          .reduce(
            (sum, expense) =>
              sum +
              convertExpenseToBaseCurrency(
                expense.amount,
                expense.currency,
                baseCurrency,
                currencyRates,
              ),
            0,
          ),
      })),
    [baseCurrency, currencyRates, expenses],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-orange-50 px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            XPNSivity
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Smart spending overview
          </h1>
          <p className="max-w-2xl text-slate-600">
            Track daily expenses, monitor category-wise spending, and view totals
            in your preferred currency.
          </p>
        </header>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isPageLoading ? (
          <section className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="text-lg font-semibold text-slate-800">Loading expenses...</p>
            <p className="mt-1 text-sm text-slate-500">
              Preparing your dashboard and currency data.
            </p>
          </section>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-3" aria-busy={isPageLoading}>
          <div className="space-y-6 lg:col-span-2">
            <TotalCard
              totalAmount={convertedTotal}
              totalCount={expenses.length}
              baseCurrency={baseCurrency}
            />
            <ExpenseForm
              categories={categories}
              currencies={currencies}
              defaultCurrency={baseCurrency}
              onSubmit={addExpense}
              isSubmitting={isSubmittingExpense}
            />
            <ExpenseList
              expenses={sortedExpenses}
              onDelete={deleteExpense}
              deletingExpenseId={deletingExpenseId}
              isLoading={isPageLoading}
            />
          </div>

          <div className="space-y-6">
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={baseCurrency}
              onChange={setBaseCurrency}
              isLoading={rateLoading}
              isError={rateError}
            />
            <CategoryBreakdown
              breakdown={breakdownByCategory}
              baseCurrency={baseCurrency}
              isLoading={isPageLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
