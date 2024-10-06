const RE_DATE = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;
const RE_DATETIME = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/;
const RE_DATETIME_WITH_TIMEZONE =
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}([+-]\d{2}:\d{2}|Z)/;
const KST_OFFSET = 9 * 60;

const validate_date = (date: string): void => {
  if (!RE_DATE.test(date)) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid date string: ${date}`,
    });
  }
};

const validate_any_date = (date: string): void => {
  if (
    !(
      RE_DATETIME_WITH_TIMEZONE.test(date) ||
      RE_DATETIME.test(date) ||
      RE_DATE.test(date)
    )
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid date string: ${date}`,
    });
  }
};

const parse_date_only = (date: string): string => {
  return (date = date.match(RE_DATE)?.at(0) as string);
};

const parse_any_date_only = (date: string): string => {
  for (const re of [RE_DATETIME_WITH_TIMEZONE, RE_DATETIME, RE_DATE]) {
    if (re.test(date)) {
      return (date as string).match(re)?.at(0) as string;
    }
  }
  return "";
};

const to_utc_date = (date: string): string => {
  const d = new Date(date);
  const utc = Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
    d.getUTCMilliseconds()
  );
  return new Date(utc).toISOString();
};

const to_kst_date = (date: string): string => {
  const utc = to_utc_date(date);
  const d = new Date(utc);
  return new Date(d.getTime() + KST_OFFSET * 60 * 1000)
    .toISOString()
    .replace(/Z$/, "+09:00");
};

export {
  parse_any_date_only,
  parse_date_only,
  to_kst_date,
  to_utc_date,
  validate_any_date,
  validate_date,
};
