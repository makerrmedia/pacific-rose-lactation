import bloom from '../data/bloom.json';
import { upcoming, MON, MONL, weekdayName, nextShort, icsFor, key, type BloomConfig, type BloomDate } from '../lib/bloom';

const cfg = bloom as unknown as BloomConfig & { timeLabel: string };
const sessions: BloomDate[] = upcoming(cfg, 4);

function toast(msg: string) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

function download(d: BloomDate) {
  const ds = key(d).replace(/-/g, '');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([icsFor(d, cfg)], { type: 'text/calendar' }));
  a.download = `bloom-circle-${ds}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast('Calendar file downloaded');
}

document.querySelectorAll('[data-next-short]').forEach((el) => {
  el.textContent = sessions[0] ? nextShort(sessions[0], cfg) : 'Free to attend';
});

const grid = document.getElementById('dateGrid');
if (grid) {
  grid.innerHTML = '';
  sessions.forEach((d, i) => {
    const el = document.createElement('div');
    el.className = 'date' + (i === 0 ? ' first' : '');
    const small = document.createElement('small');
    small.textContent = MONL[d.m] + (i === 0 ? ' · Next up' : '');
    const b = document.createElement('b');
    b.textContent = String(d.d);
    const span = document.createElement('span');
    span.textContent = `${weekdayName(d)} · ${cfg.timeLabel}` + (d.note ? ` · ${d.note}` : '');
    const btn = document.createElement('button');
    btn.className = 'btn ghost';
    btn.type = 'button';
    btn.textContent = 'Add to calendar';
    btn.addEventListener('click', () => download(d));
    el.append(small, b, span, btn);
    grid.appendChild(el);
  });
}

document.getElementById('jumpRem')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('reminders')?.scrollIntoView({ behavior: 'smooth' });
});
