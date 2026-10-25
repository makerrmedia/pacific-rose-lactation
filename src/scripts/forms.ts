// Contact + reminder forms. Each form carries a data-endpoint attribute set from
// src/data/site.json. Until an endpoint is set, the form tells the visitor to
// email instead of pretending the message was sent.

import site from '../data/site.json';

const okEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

async function send(form: HTMLFormElement, endpoint: string): Promise<boolean> {
  const data = new FormData(form);
  try {
    if (endpoint === 'netlify') {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      return res.ok;
    }
    const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    return res.ok;
  } catch {
    return false;
  }
}

function wire(opts: {
  formId: string;
  errId: string;
  okId: string;
  validate: (form: HTMLFormElement) => { ok: boolean; message: string; bad?: HTMLElement[] };
  fallback: string;
}) {
  const form = document.getElementById(opts.formId) as HTMLFormElement | null;
  if (!form) return;
  const err = document.getElementById(opts.errId);
  const ok = document.getElementById(opts.okId);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.querySelectorAll('.bad').forEach((x) => x.classList.remove('bad'));
    const hp = form.querySelector<HTMLInputElement>('input[name="website"]');
    if (hp && hp.value) return; // honeypot
    const v = opts.validate(form);
    if (!v.ok) {
      v.bad?.forEach((x) => x.classList.add('bad'));
      if (err) err.textContent = v.message;
      v.bad?.[0]?.focus();
      return;
    }
    const endpoint = form.dataset.endpoint || '';
    if (!endpoint) {
      if (err) err.textContent = opts.fallback;
      return;
    }
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) btn.disabled = true;
    const sent = await send(form, endpoint);
    if (btn) btn.disabled = false;
    if (!sent) {
      if (err) err.textContent = opts.fallback;
      return;
    }
    if (err) err.textContent = '';
    form.style.display = 'none';
    ok?.classList.add('show');
  });
}

wire({
  formId: 'remForm',
  errId: 'remErr',
  okId: 'remOk',
  validate: (f) => {
    const input = f.querySelector<HTMLInputElement>('#remEmail')!;
    return okEmail(input.value) ? { ok: true, message: '' } : { ok: false, message: 'Please enter a valid email address.', bad: [input] };
  },
  fallback: `Sorry, that didn’t go through. Please email ${site.email} and ask to be added.`,
});

wire({
  formId: 'contactForm',
  errId: 'cErr',
  okId: 'cOk',
  validate: (f) => {
    const n = f.querySelector<HTMLInputElement>('#cName')!;
    const m = f.querySelector<HTMLInputElement>('#cEmail')!;
    const g = f.querySelector<HTMLTextAreaElement>('#cMsg')!;
    const bad: HTMLElement[] = [];
    if (!n.value.trim()) bad.push(n);
    if (!okEmail(m.value)) bad.push(m);
    if (g.value.trim().length < 5) bad.push(g);
    return bad.length
      ? { ok: false, message: 'Please fill in your name, a valid email, and a short message.', bad }
      : { ok: true, message: '' };
  },
  fallback: `Sorry, that didn’t go through. Please email ${site.email} or call ${site.phone}.`,
});
