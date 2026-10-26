// Bloom Circle date logic. Dates are plain {y, m, d} values (m is 0-11) so they
// never shift with time zones. The same code runs at build time and in the
// browser (so the page stays current without a rebuild).

export interface BloomConfig {
  weekday: number;
  weeksOfMonth: number[];
  startHour: number;
  endHour: number;
  cancelledDates: (string | { date?: string | null })[];
  extraDates: { date: string; note?: string }[];
  venue: string;
  street: string;
  cityLine: string;
}

export interface BloomDate {
  y: number;
  m: number;
  d: number;
  note?: string;
  special?: boolean;
}

export const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const pad = (n: number) => String(n).padStart(2, '0');
export const key = (x: { y: number; m: number; d: number }) => `${x.y}-${pad(x.m + 1)}-${pad(x.d)}`;

/** Today's date and hour in Portland, regardless of where the code runs. */
export function todayPT(now = new Date()): { y: number; m: number; d: number; h: number } {
  const s = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(now);
  const [y, m, d] = s.split('-').map(Number);
  const h = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', hourCycle: 'h23' }).format(now));
  return { y, m: m - 1, d, h };
}

function nthWeekday(y: number, m: number, weekday: number, n: number): number {
  const first = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const off = (weekday - first + 7) % 7;
  return 1 + off + (n - 1) * 7;
}

function parseKey(k: string) {
  const [y, m, d] = k.split('-').map(Number);
  return { y, m: m - 1, d };
}

const cmp = (a: { y: number; m: number; d: number }, b: { y: number; m: number; d: number }) =>
  a.y - b.y || a.m - b.m || a.d - b.d;

export function upcoming(cfg: BloomConfig, count: number, from: { y: number; m: number; d: number; h?: number } = todayPT()): BloomDate[] {
  // once today's session has ended, today no longer counts as upcoming
  const todayOver = (from as { h?: number }).h !== undefined && (from as { h: number }).h >= cfg.endHour;
  const isUpcoming = (date: { y: number; m: number; d: number }) => {
    const c = cmp(date, from);
    return c > 0 || (c === 0 && !todayOver);
  };
  const cancelled = new Set(
    (cfg.cancelledDates || []).map((c) => (typeof c === 'string' ? c : c?.date || '').trim()).filter(Boolean)
  );
  const out: BloomDate[] = [];
  const seen = new Set<string>();

  // regular schedule: look ahead far enough to fill `count` after cancellations
  let y = from.y;
  let m = from.m;
  for (let i = 0; i < 30 && out.length < count + 12; i++) {
    for (const n of cfg.weeksOfMonth) {
      const day = nthWeekday(y, m, cfg.weekday, n);
      const date = { y, m, d: day };
      if (isUpcoming(date) && !cancelled.has(key(date))) {
        out.push(date);
        seen.add(key(date));
      }
    }
    m++;
    if (m > 11) { m = 0; y++; }
  }

  // one-off extra dates added in the dashboard
  for (const e of cfg.extraDates || []) {
    if (!e?.date || !/^\d{4}-\d{2}-\d{2}$/.test(e.date.trim())) continue;
    const date = parseKey(e.date.trim());
    if (isUpcoming(date) && !cancelled.has(e.date) && !seen.has(e.date)) {
      out.push({ ...date, note: e.note, special: true });
    }
  }

  out.sort(cmp);
  return out.slice(0, count);
}

export function weekdayName(x: { y: number; m: number; d: number }): string {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(Date.UTC(x.y, x.m, x.d)).getUTCDay()];
}

export function nextShort(x: BloomDate, cfg: BloomConfig): string {
  const wd = weekdayName(x).slice(0, 3);
  const h = cfg.startHour > 12 ? cfg.startHour - 12 : cfg.startHour;
  const ap = cfg.startHour >= 12 ? 'pm' : 'am';
  return `${wd}, ${MON[x.m]} ${x.d} · ${h}${ap}, free`;
}

export function icsFor(x: BloomDate, cfg: BloomConfig): string {
  const ds = `${x.y}${pad(x.m + 1)}${pad(x.d)}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Pacific Rose Lactation//Bloom Circle//EN',
    'BEGIN:VTIMEZONE', 'TZID:America/Los_Angeles',
    'BEGIN:DAYLIGHT', 'TZOFFSETFROM:-0800', 'TZOFFSETTO:-0700', 'TZNAME:PDT', 'DTSTART:19700308T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU', 'END:DAYLIGHT',
    'BEGIN:STANDARD', 'TZOFFSETFROM:-0700', 'TZOFFSETTO:-0800', 'TZNAME:PST', 'DTSTART:19701101T020000', 'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU', 'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:bloomcircle-${ds}@pacificroselactation`, `DTSTAMP:${stamp}`,
    `DTSTART;TZID=America/Los_Angeles:${ds}T${pad(cfg.startHour)}0000`,
    `DTEND;TZID=America/Los_Angeles:${ds}T${pad(cfg.endHour)}0000`,
    'SUMMARY:Bloom Circle breastfeeding support group',
    `LOCATION:${cfg.venue}\\, ${cfg.street}\\, ${cfg.cityLine.replace(/,/g, '\\,')}`,
    'DESCRIPTION:Free breastfeeding support group with Pacific Rose Lactation. Snacks + mocktails. Donations welcome.',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}
