export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const StoryPartsFragmentDoc = gql`
    fragment StoryParts on Story {
  __typename
  title
  tag
  place
  name
  excerpt
  going
  worked
  now
  serviceLabel
  draft
  sample
  seoTitle
  metaDescription
  color
  order
}
    `;
export const BloomPartsFragmentDoc = gql`
    fragment BloomParts on Bloom {
  __typename
  cancelledDates {
    __typename
    date
    note
  }
  extraDates {
    __typename
    date
    note
  }
  scheduleLabel
  timeLabel
  venue
  venueNote
  street
  cityLine
  mapsUrl
  topics
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  services {
    __typename
    title
    shortTitle
    homeBlurb
    homeMeta
    subtitle
    color
    open
    left {
      __typename
      paragraphs {
        __typename
        text
      }
      list {
        __typename
        heading
        items
      }
    }
    right {
      __typename
      heading
      twoCol
      items
    }
  }
  cashRate
  insurance
  pills
  also
}
    `;
export const FaqPartsFragmentDoc = gql`
    fragment FaqParts on Faq {
  __typename
  items {
    __typename
    q
    a
    linkLabel
    linkHref
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  name
  homeCred
  homeBlurb
  homeFacts {
    __typename
    big
    small
  }
  aboutCred
  bio {
    __typename
    text
  }
  facts {
    __typename
    big
    small
  }
  timeline {
    __typename
    year
    title
    text
  }
}
    `;
export const TestimonialsPartsFragmentDoc = gql`
    fragment TestimonialsParts on Testimonials {
  __typename
  items {
    __typename
    quote
    attribution
    placeholder
  }
}
    `;
export const StatsPartsFragmentDoc = gql`
    fragment StatsParts on Stats {
  __typename
  stat1 {
    __typename
    title
    line1
    line2
  }
  stat2 {
    __typename
    title
    line1
    line2
  }
  stat3 {
    __typename
    title
    line1
    line2
  }
}
    `;
export const TilesPartsFragmentDoc = gql`
    fragment TilesParts on Tiles {
  __typename
  eyebrow
  heading
  tile1 {
    __typename
    label
    line1
    line2
    link
  }
  tile2 {
    __typename
    label
    line1
    line2
    link
  }
  tile3 {
    __typename
    label
    line1
    line2
    link
  }
  tile4 {
    __typename
    label
    line1
    line2
    link
  }
}
    `;
export const SitePartsFragmentDoc = gql`
    fragment SiteParts on Site {
  __typename
  phone
  email
  astoriaPhone
  bookingUrl
  instagramHandle
  instagramUrl
  facebookUrl
  portraitPhoto
  name
}
    `;
export const StoryDocument = gql`
    query story($relativePath: String!) {
  story(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StoryParts
  }
}
    ${StoryPartsFragmentDoc}`;
export const StoryConnectionDocument = gql`
    query storyConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StoryFilter) {
  storyConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StoryParts
      }
    }
  }
}
    ${StoryPartsFragmentDoc}`;
export const BloomDocument = gql`
    query bloom($relativePath: String!) {
  bloom(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BloomParts
  }
}
    ${BloomPartsFragmentDoc}`;
export const BloomConnectionDocument = gql`
    query bloomConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BloomFilter) {
  bloomConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BloomParts
      }
    }
  }
}
    ${BloomPartsFragmentDoc}`;
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const FaqDocument = gql`
    query faq($relativePath: String!) {
  faq(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqParts
  }
}
    ${FaqPartsFragmentDoc}`;
export const FaqConnectionDocument = gql`
    query faqConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqFilter) {
  faqConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqParts
      }
    }
  }
}
    ${FaqPartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const TestimonialsDocument = gql`
    query testimonials($relativePath: String!) {
  testimonials(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialsParts
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export const TestimonialsConnectionDocument = gql`
    query testimonialsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialsFilter) {
  testimonialsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialsParts
      }
    }
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export const StatsDocument = gql`
    query stats($relativePath: String!) {
  stats(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StatsParts
  }
}
    ${StatsPartsFragmentDoc}`;
export const StatsConnectionDocument = gql`
    query statsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StatsFilter) {
  statsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StatsParts
      }
    }
  }
}
    ${StatsPartsFragmentDoc}`;
export const TilesDocument = gql`
    query tiles($relativePath: String!) {
  tiles(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TilesParts
  }
}
    ${TilesPartsFragmentDoc}`;
export const TilesConnectionDocument = gql`
    query tilesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TilesFilter) {
  tilesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TilesParts
      }
    }
  }
}
    ${TilesPartsFragmentDoc}`;
export const SiteDocument = gql`
    query site($relativePath: String!) {
  site(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteParts
  }
}
    ${SitePartsFragmentDoc}`;
export const SiteConnectionDocument = gql`
    query siteConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteFilter) {
  siteConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteParts
      }
    }
  }
}
    ${SitePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    story(variables, options) {
      return requester(StoryDocument, variables, options);
    },
    storyConnection(variables, options) {
      return requester(StoryConnectionDocument, variables, options);
    },
    bloom(variables, options) {
      return requester(BloomDocument, variables, options);
    },
    bloomConnection(variables, options) {
      return requester(BloomConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    faq(variables, options) {
      return requester(FaqDocument, variables, options);
    },
    faqConnection(variables, options) {
      return requester(FaqConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    testimonials(variables, options) {
      return requester(TestimonialsDocument, variables, options);
    },
    testimonialsConnection(variables, options) {
      return requester(TestimonialsConnectionDocument, variables, options);
    },
    stats(variables, options) {
      return requester(StatsDocument, variables, options);
    },
    statsConnection(variables, options) {
      return requester(StatsConnectionDocument, variables, options);
    },
    tiles(variables, options) {
      return requester(TilesDocument, variables, options);
    },
    tilesConnection(variables, options) {
      return requester(TilesConnectionDocument, variables, options);
    },
    site(variables, options) {
      return requester(SiteDocument, variables, options);
    },
    siteConnection(variables, options) {
      return requester(SiteConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
