import dayjs from 'dayjs';

export const utcToLocal = (utcTime: string): string => {
  const date = new Date(utcTime);
  const formatDate = dayjs(date).format('YYYY-MM-DD HH:mm');
  return formatDate;
};

export const localToUtc = (localTime: string): string => {
  const date = new Date(localTime);
  return date.toUTCString();
};
