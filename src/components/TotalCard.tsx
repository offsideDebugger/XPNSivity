import type { Currency } from '../types'

interface TotalCardProps {
  totalAmount: number
  totalCount: number
  baseCurrency: Currency
}

const formatAmount = (amount: number, currency: Currency) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)

export function TotalCard({ totalAmount, totalCount, baseCurrency }: TotalCardProps) {
  return (
    <section className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 p-6 text-white shadow-sm">
      <p className="text-sm uppercase tracking-[0.15em] text-sky-100">Running Total</p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">
            {formatAmount(totalAmount, baseCurrency)}
          </h2>
          <p className="mt-1 text-sm text-sky-100">Converted in {baseCurrency}</p>
        </div>
        <div className="rounded-lg bg-white/30 px-4 py-3 text-sm shadow-sm shadow-blue-200 backdrop-blur-sm">
          <span className="font-semibold">{totalCount}</span> total expenses
        </div>
      </div>
    </section>
  )
}
