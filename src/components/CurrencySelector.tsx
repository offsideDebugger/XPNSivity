import type { Currency } from '../types'

interface CurrencySelectorProps {
  currencies: Currency[]
  selectedCurrency: Currency
  onChange: (currency: Currency) => void
  isLoading: boolean
  isError: boolean
}

export function CurrencySelector({
  currencies,
  selectedCurrency,
  onChange,
  isLoading,
  isError,
}: CurrencySelectorProps){
  return (
    <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Base Currency</h2>
      <p className="mt-1 text-sm text-slate-500">
        All totals are converted to this currency.
      </p>
      <select
        value={selectedCurrency}
        onChange={(event) => onChange(event.target.value as Currency)}
        className="mt-4 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      {isLoading && (
        <p className="text-xs text-slate-500 mt-1">Fetching rate...</p>
      )}
      {isError && (
        <p className="text-xs text-red-500 mt-1">Conversion unavailable</p>
      )}
    </section>
  )
}
