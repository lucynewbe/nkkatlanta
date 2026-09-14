export function formatTime(t) {
  if (!t) return '';
  try {
    return new Date(`1970-01-01T${t}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } catch {
    return t;
  }
}

export function eventTimeRange(event) {
  if (!event?.time_start) return '';
  const start = formatTime(event.time_start);
  const end = event.time_end ? formatTime(event.time_end) : '';
  return end ? `${start} – ${end}` : start;
}
