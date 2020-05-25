export function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export const formatRelative = locale => date => {
  const msPerHour = 1000 * 60 * 60;
  const dateDiffInMs = new Date(date) - new Date();
  const dateDiffInHours = parseInt((dateDiffInMs / msPerHour).toString(), 10);
  const dateDiffInDays = parseInt(
    (dateDiffInMs / (msPerHour * 24)).toString(),
    10
  );
  const dateDiffInWeeks = parseInt(
    (dateDiffInMs / (msPerHour * 168)).toString(),
    10
  );
  const dateDiffInMonths = parseInt(
    (dateDiffInMs / (msPerHour * 720)).toString(),
    10
  );
  const rtf = new Intl.RelativeTimeFormat(locale, {numeric: 'auto'});
  const unit =
    dateDiffInMonths >= 1
      ? 'month'
      : dateDiffInWeeks >= 1
      ? 'week'
      : dateDiffInDays >= 1
      ? 'day'
      : 'hour';
  const values = [
    dateDiffInHours,
    dateDiffInDays,
    dateDiffInWeeks,
    dateDiffInMonths
  ].filter(t => t > 0);
  const value = Math.min(...values);

  return rtf.format(value, unit);
};
