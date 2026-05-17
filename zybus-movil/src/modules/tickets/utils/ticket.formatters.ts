export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-CR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-CR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
