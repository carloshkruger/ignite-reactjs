export function convertStringTimeToMinutes(stringTime: string) {
  const [hours, minutes] = stringTime.split(':').map(Number)

  return hours * 60 + minutes
}
