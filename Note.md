## What I Built

XPNSivity is a personal expense tracking app built with React and Vite. It lets users log expenses with a name, amount, category, and date, and view a live running total converted to their preferred currency. The interface is split into a main panel for adding and listing expenses, and a sidebar for currency selection and category-wise spending breakdown.

## What API I Used

I used the Frankfurter API (api.frankfurter.dev) for live currency exchange rates. The base currency is USD, when the user switches currency, the app fetches the latest rate and applies it across the total and all category breakdowns simultaneously. Loading and error states are handled gracefully so the UI never breaks if the API call fails.

## Challenges I Faced

The trickiest part was keeping category totals and the running total in sync with the selected currency. My initial approach tried to run async fetch calls inside useMemo, which always returned undefined. The fix was to fetch the exchange rate once into state via useEffect and apply it synchronously across all calculations, keeping the UI reactive without redundant API calls.

## What I'd Improve With More Time

I'd add a chart view for visual spending breakdown by category, and a dedicated history tab that filters expenses by category or date range. The name XPNSivity is a working title.I'd also refine the branding and add subtle animations to make interactions feel more polished.
