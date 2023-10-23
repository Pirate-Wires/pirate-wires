export const useDateFormatter = (date) => {
  const unformattedDate = new Date(date)
  return unformattedDate.toLocaleString('default', { month: 'short', day: 'numeric' })
}