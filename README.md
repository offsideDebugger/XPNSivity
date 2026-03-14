# Expense Tracker

A clean and responsive expense tracker built with React, Vite, TypeScript, and Tailwind CSS.

This project is managed with Bun.

## Features

- Add expenses with name, amount, category, currency, and date
- Delete expenses directly from the list
- View expenses in a newest-first table
- Running total card with converted total amount
- Category breakdown section
- Base currency selector with live exchange-rate fetch
- Loading and error states for app actions and rate fetch
- Responsive layout for desktop and mobile

## Tech Stack

- React (functional components + hooks)
- TypeScript
- Vite
- Tailwind CSS

## Project Structure

```text
src/
  components/
    CategoryBreakdown.tsx
    CurrencySelector.tsx
    ExpenseForm.tsx
    ExpenseItem.tsx
    ExpenseList.tsx
    TotalCard.tsx
  App.tsx
  main.tsx
  types.ts
```

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Start the dev server:

```bash
bun run dev
```

3. Open the app in your browser (Vite prints the local URL in terminal).

## Available Scripts

- `bun run dev` - Run the app in development mode
- `bun run build` - Type-check and build for production
- `bun run preview` - Preview the production build locally
- `bun run lint` - Run ESLint

## Notes

- Currency conversion uses a public exchange-rate API (`frankfurter.dev`).
- If the exchange-rate request fails, the UI shows a conversion error state.
