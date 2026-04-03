export interface FormattedDate {
  display: string;
  datetime: string;
}

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export const formatDate = (date_str: string): FormattedDate => {
  // Date-only string — no time info
  if (/^\d{4}-[01]\d-[0-3]\d$/.test(date_str)) {
    return { display: date_str, datetime: date_str };
  }

  const date = new Date(date_str);
  if (Number.isNaN(date.getTime())) {
    // Unrecognized format — extract date portion as fallback
    const date_only = date_str.match(/\d{4}-[01]\d-[0-3]\d/)?.[0] ?? date_str;
    return { display: date_only, datetime: date_only };
  }

  // Convert to KST (UTC+9)
  const kst = new Date(date.getTime() + KST_OFFSET_MS);
  const yyyy = String(kst.getUTCFullYear()).padStart(4, "0");
  const mm = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(kst.getUTCDate()).padStart(2, "0");
  const hh = String(kst.getUTCHours()).padStart(2, "0");
  const min = String(kst.getUTCMinutes()).padStart(2, "0");
  const ss = String(kst.getUTCSeconds()).padStart(2, "0");

  const date_part = `${yyyy}-${mm}-${dd}`;

  if (hh === "00" && min === "00" && ss === "00") {
    return { display: date_part, datetime: date_part };
  }

  return { display: `${date_part} ${hh}:${min} KST`, datetime: date_str };
};
