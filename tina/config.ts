import { defineConfig } from 'tinacms';
import servicesData from '../src/data/services.json';

// Branch the dashboard edits. Hosts set one of these automatically.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.CF_PAGES_BRANCH ||
  process.env.HEAD ||
  process.env.BRANCH ||
  'main';

// ---- small helpers so the schema below stays readable ----
const text = (name: string, label: string, description?: string, extra: Record<string, unknown> = {}) => ({
  type: 'string' as const,
  name,
  label,
  description,
  ...extra,
});
const longText = (name: string, label: string, description?: string) =>
  text(name, label, description, { ui: { component: 'textarea' } });
const stringList = (name: string, label: string, description?: string) => ({
  type: 'string' as const,
  name,
  label,
  description,
  list: true,
});
const yesNo = (name: string, label: string, description?: string) => ({
  type: 'boolean' as const,
  name,
  label,
  description,
});

// Related-service choice that links to the Bloom Circle page instead of Services.
const BLOOM_SERVICE = 'Join Bloom Circle';

const isoDate = (value: unknown) => {
  const ok = (v: unknown) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v.trim());
  const values = Array.isArray(value) ? value : [value];
  return values.every(ok) ? undefined : 'Use the format YYYY-MM-DD, for example 2026-12-02';
};

// One-file-per-page collections: no creating or deleting, only editing.
const editOnly = { allowedActions: { create: false, delete: false } };

const jsonFile = (name: string, label: string, file: string, fields: any[]) => ({
  name,
  label,
  path: 'src/data',
  format: 'json' as const,
  match: { include: file },
  ui: editOnly,
  fields,
});

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },

  schema: {
    collections: [
      // ---------------------------------------------------------------- stories
      {
        name: 'story',
        label: 'Parent stories',
        path: 'src/content/stories',
        format: 'md',
        ui: {
          filename: {
            slugify: (values: Record<string, any>) =>
              String(values?.title || 'new-story')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .slice(0, 60),
          },
          defaultItem: () => ({
            place: 'Portland',
            color: '1',
            sample: false,
            draft: true,
            order: 100,
          }),
        },
        fields: [
          text('title', 'Headline', 'A short headline about the challenge.', { isTitle: true, required: true }),
          {
            type: 'string',
            name: 'tag',
            label: 'Topic',
            description: 'Pick the closest topic. This is what the filter buttons use.',
            options: ['Tongue tie', 'Milk supply', 'Latch + pain', 'Returning to work', 'Bottle feeding', 'Community'],
            required: true,
          },
          { type: 'string', name: 'place', label: 'City', options: ['Portland', 'Astoria'], required: true },
          longText('excerpt', 'Card teaser', 'One or two sentences shown on the story card.'),
          longText('going', 'What was going on', "The parent's words. 3 to 5 sentences. Do not include quotation marks."),
          longText('worked', 'What we worked on', "The parent's words. 3 to 5 sentences."),
          longText('now', 'How it feels now', "The parent's words. 3 to 5 sentences."),
          {
            type: 'string',
            name: 'serviceLabel',
            label: 'Related service',
            description: 'Shown in a box at the end of the story with a "Learn more" button. The button goes to the right page automatically.',
            options: [...servicesData.services.map((x) => x.title), BLOOM_SERVICE],
            required: true,
          },
          yesNo(
            'draft',
            'Keep hidden (draft)',
            'Turn this OFF only when the parent has approved the final wording in writing. Hidden stories do not appear on the site.'
          ),
          yesNo(
            'sample',
            'This is a sample story',
            'Leave ON for placeholder stories. Turn OFF for real stories. Sample stories are labeled and hidden from Google.'
          ),
          text('seoTitle', 'Google title (optional)', 'Leave blank to use the headline.'),
          longText('metaDescription', 'Google description (optional)', 'One sentence for search results.'),
          {
            type: 'string',
            name: 'color',
            label: 'Card color',
            description: 'Background color of this story on the Stories page.',
            options: [
              { value: '1', label: 'Petal pink' },
              { value: '2', label: 'Blue-grey' },
              { value: '3', label: 'Sage' },
              { value: '4', label: 'Dusty blush' },
              { value: '5', label: 'Light blue-grey' },
              { value: '6', label: 'Light sage' },
            ],
          },
          {
            type: 'number',
            name: 'order',
            label: 'Position on the Stories page',
            description: '1 = top of the page. Lower numbers appear first.',
          },
        ],
      },

      // ---------------------------------------------------------- Bloom Circle
      jsonFile('bloom', 'Bloom Circle', 'bloom', [
        {
          type: 'object',
          name: 'cancelledDates',
          label: 'Cancelled dates',
          description: 'Add a date to remove it from the regular schedule, for example a holiday.',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: item?.date || 'New date' }) },
          fields: [
            text('date', 'Date', 'Format YYYY-MM-DD, for example 2026-12-02', { ui: { validate: isoDate } }),
            text('note', 'Reason (optional, for your own reference)', 'For example: Thanksgiving week'),
          ],
        },
        {
          type: 'object',
          name: 'extraDates',
          label: 'Extra dates',
          description: 'One-off sessions that are not on the regular schedule.',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: item?.date || 'New date' }) },
          fields: [
            text('date', 'Date', 'Format YYYY-MM-DD, for example 2026-11-10', { ui: { validate: isoDate } }),
            text('note', 'Note (optional)', 'For example: Guest speaker'),
          ],
        },
        text('venue', 'Venue'),
        text('venueNote', 'Venue note'),
        text('street', 'Street address'),
        text('cityLine', 'City, state, zip'),
        text('mapsUrl', 'Directions link'),
        stringList('topics', 'Past + upcoming topics'),
        // The weekday, week-of-month and hour rules live in src/data/bloom.json and are not shown here.
        text('scheduleLabel', 'Schedule label (shown on the site)', 'For example: 1st + 3rd Wednesdays'),
        text('timeLabel', 'Time label (shown on the site)', 'For example: 10am to 12pm'),
      ]),

      // -------------------------------------------------------------- Services
      jsonFile('services', 'Services + rates', 'services', [
        text('cashRate', 'Cash rate', 'For example: $200'),
        stringList('insurance', 'Insurance badges'),
        stringList('pills', 'Highlights under the page title'),
        stringList('also', '"Also supporting" chips'),
        {
          type: 'object',
          name: 'services',
          label: 'Services',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: item?.title || 'New service' }) },
          fields: [
            text('num', 'Number', 'For example: 01'),
            { type: 'string', name: 'color', label: 'Card color', options: ['a', 'b', 'c', 'd'] },
            text('title', 'Title'),
            text('shortTitle', 'Short title (home page card)'),
            longText('homeBlurb', 'Home page card text'),
            text('homeMeta', 'Home page card duration'),
            text('subtitle', 'Subtitle (services page)'),
            yesNo('open', 'Open by default'),
            {
              type: 'object',
              name: 'left',
              label: 'Left column',
              fields: [
                {
                  type: 'object',
                  name: 'paragraphs',
                  label: 'Paragraphs',
                  list: true,
                  ui: { itemProps: (item: Record<string, any>) => ({ label: String(item?.text || 'Paragraph').slice(0, 50) }) },
                  fields: [longText('text', 'Text')],
                },
                {
                  type: 'object',
                  name: 'list',
                  label: 'Checklist (optional)',
                  fields: [text('heading', 'Heading'), stringList('items', 'Items')],
                },
              ],
            },
            {
              type: 'object',
              name: 'right',
              label: 'Right column',
              fields: [
                text('heading', 'Heading'),
                yesNo('twoCol', 'Show in two columns'),
                stringList('items', 'Items'),
              ],
            },
          ],
        },
      ]),

      // ------------------------------------------------------------------- FAQ
      jsonFile('faq', 'FAQ', 'faq', [
        {
          type: 'object',
          name: 'items',
          label: 'Questions',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: item?.q || 'New question' }) },
          fields: [
            text('q', 'Question'),
            longText('a', 'Answer'),
            text('linkLabel', 'Link text (optional)'),
            text('linkHref', 'Link address (optional)', 'For example: /bloom-circle'),
          ],
        },
      ]),

      // ----------------------------------------------------------------- About
      jsonFile('about', 'About Whitney', 'about', [
        text('name', 'Name'),
        text('homeCred', 'Credentials (home page)'),
        text('aboutCred', 'Credentials (about page)'),
        longText('homeBlurb', 'Short intro (home page)'),
        {
          type: 'object',
          name: 'bio',
          label: 'Bio paragraphs (about page)',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: String(item?.text || 'Paragraph').slice(0, 50) }) },
          fields: [longText('text', 'Text')],
        },
        {
          type: 'object',
          name: 'homeFacts',
          label: 'Facts (home page)',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: item?.big || 'Fact' }) },
          fields: [text('big', 'Big text'), text('small', 'Small text')],
        },
        {
          type: 'object',
          name: 'facts',
          label: 'Facts (about page)',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: item?.big || 'Fact' }) },
          fields: [text('big', 'Big text'), text('small', 'Small text')],
        },
        {
          type: 'object',
          name: 'timeline',
          label: 'Timeline',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: `${item?.year || ''} ${item?.title || ''}`.trim() || 'New entry' }) },
          fields: [text('year', 'Year or label'), text('title', 'Title'), longText('text', 'Description')],
        },
      ]),

      // ---------------------------------------------------------- Testimonials
      jsonFile('testimonials', 'Testimonials', 'testimonials', [
        {
          type: 'object',
          name: 'items',
          label: 'Testimonials',
          description: 'Only add a testimonial with written permission from the parent.',
          list: true,
          ui: { itemProps: (item: Record<string, any>) => ({ label: item?.attribution || 'New testimonial' }) },
          fields: [
            longText('quote', 'Quote', 'Do not include quotation marks.'),
            text('attribution', 'Attribution', 'First name only, plus city. For example: Sam, Portland'),
            yesNo('placeholder', 'This is a placeholder', 'Turn OFF for a real testimonial.'),
          ],
        },
      ]),

      // ------------------------------------------------------------- Site info
      jsonFile('site', 'Contact + site info', 'site', [
        text('phone', 'Phone'),
        text('email', 'Email'),
        text('astoriaPhone', 'Astoria front desk phone'),
        text('bookingUrl', 'Home visit booking link'),
        text('instagramHandle', 'Instagram handle'),
        text('instagramUrl', 'Instagram link'),
        text('facebookUrl', 'Facebook link'),
        { type: 'image', name: 'portraitPhoto', label: "Whitney's photo" },
        text('tagline', 'Tagline'),
        text('name', 'Business name'),
        text('url', 'Website address'),
        text('contactFormEndpoint', 'Contact form address (Emily sets this)'),
        text('reminderFormEndpoint', 'Reminder form address (Emily sets this)'),
      ]),
    ],
  },
});
