export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY'

export interface Expense {
  id: string
  name: string
  amount: number
  category: Category
  currency: Currency
  date: string
  createdAt: number
}

export interface CategoryBreakdown {
  category: Category
  total: number
}
