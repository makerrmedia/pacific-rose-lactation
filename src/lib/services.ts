// Anchor for a service on the Services page, so links can jump straight to it.
export const serviceId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const serviceHref = (title: string) => `/services#${serviceId(title)}`;
