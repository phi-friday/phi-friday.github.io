const re_date = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;
const validate_date = (date: string): void => {
  if (!re_date.test(date)) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid date string: ${date}`,
    });
  }
};

const parse_date_only = (date: string): string => {
  validate_date(date);
  return (date = date.match(re_date)?.at(0) as string);
};

export { parse_date_only, validate_date };
