import type { CategoryBreakdown as CategoryBreakdownItem, Currency } from '../types'

interface CategoryBreakdownProps {
  breakdown: CategoryBreakdownItem[]
  baseCurrency: Currency
  isLoading: boolean
}

const formatAmount = (amount: number, currency: Currency) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)

export function CategoryBreakdown({
  breakdown,
  baseCurrency,
  isLoading,
}: CategoryBreakdownProps) {
  const total = breakdown.reduce((sum, item) => sum + item.total, 0)

  return (
    <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Category Breakdown</h2>
      <p className="mt-1 text-sm text-slate-500">Spending totals by category.</p>

      {isLoading ? (
        <p className="mt-4 text-sm font-medium text-slate-600">Loading category totals...</p>
      ) : (
        <div className="mt-4 space-y-3">
          {breakdown.map((item) => {
            const percentage = total === 0 ? 0 : (item.total / total) * 100

            return (
              <div key={item.category} className="rounded-lg bg-slate-50 px-3 py-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">{item.category}</span>
                  <span className="text-slate-600">
                    {formatAmount(item.total, baseCurrency)} ({percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
