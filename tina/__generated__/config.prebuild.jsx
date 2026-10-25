// tina/config.ts
import { defineConfig } from "tinacms";

// src/data/services.json
var services_default = {
  cashRate: "$200",
  insurance: [
    "All major health plans",
    "Tricare",
    "OHP"
  ],
  pills: [
    "$200 cash rate",
    "All major health plans accepted",
    "Portland home visits",
    "Astoria office"
  ],
  also: [
    "NICU to home transitions",
    "Preventative postpartum care",
    "Returning to work"
  ],
  services: [
    {
      color: "a",
      title: "Lactation support session",
      shortTitle: "Lactation support session",
      homeBlurb: "Latch, pain, supply, pumping, mastitis, weight gain, and more.",
      homeMeta: "60 to 90 minutes",
      subtitle: "1 to 1 consultation \xB7 60 to 90 minutes",
      open: true,
      left: {
        paragraphs: [
          {
            text: "Develop strategies for overcoming breast and chestfeeding issues, with an expert in your corner."
          },
          {
            text: "Includes support with galactagogues, inducing lactation in non-gestational parents, and healing nipple damage or recurrent mastitis."
          }
        ],
        list: {
          heading: "Breast pump guidance",
          items: [
            "Pump types and how they differ",
            "Breast sizing for the right flange fit",
            "Planning when and where to pump, and returning to work"
          ]
        }
      },
      right: {
        heading: "Common issues",
        twoCol: true,
        items: [
          "Difficulty latching",
          "Nipple damage or pain",
          "Tongue tie",
          "Nipple shields",
          "Over or under supply",
          "Mastitis, plugged ducts, thrush",
          "Pumping",
          "Reducing triple feeding",
          "Breast aversion",
          "Flat or inverted nipples",
          "Slow weight gain",
          "Unsettled at the breast",
          "Falling asleep while feeding"
        ]
      }
    },
    {
      color: "b",
      title: "Bottle feeding support",
      shortTitle: "Bottle feeding support",
      homeBlurb: "Paced feeding, formula questions, mixed feeding, gas, and colic.",
      homeMeta: "60 to 90 minutes",
      subtitle: "1 to 1 session \xB7 60 to 90 minutes",
      open: false,
      left: {
        paragraphs: [
          {
            text: "A session with an infant feeding expert to work through bottle feeding challenges, without judgment, whatever your feeding goals are."
          }
        ]
      },
      right: {
        heading: "Common issues",
        twoCol: true,
        items: [
          "Bottle aversion",
          "Gas, wind, and colic",
          "Paced bottle feeding",
          "Choosing a formula",
          "Choosing a bottle",
          "Safe formula preparation",
          "Mixed feeding",
          "Reintroducing the breast",
          "Pumping and expressing",
          "Cow\u2019s milk sensitivity",
          "Tongue tie"
        ]
      }
    },
    {
      color: "c",
      title: "Prenatal breastfeeding master class",
      shortTitle: "Prenatal master class",
      homeBlurb: "A two part, in-home education series before baby arrives.",
      homeMeta: "2 \xD7 60 minutes",
      subtitle: "2 part in-home education \xB7 2 \xD7 60 minutes",
      open: false,
      left: {
        paragraphs: [
          {
            text: "Learn what you need to know about lactation and infant feeding before your baby arrives. Each course is customized to your own goals, fears, and previous experiences."
          },
          {
            text: "Sessions include a personalized risk assessment and medical history review, so we can plan around anything that might affect your feeding journey."
          }
        ]
      },
      right: {
        heading: "Topics",
        twoCol: true,
        items: [
          "How the body makes milk",
          "Building a strong supply",
          "Attachment + positioning",
          "Feeding cues",
          "Is baby getting enough?",
          "Normal newborn behavior",
          "The 4th trimester",
          "Common early pitfalls",
          "Bottles, pumping, formula"
        ]
      }
    },
    {
      color: "d",
      title: "Tongue tie assessment + support",
      shortTitle: "Tongue tie assessment",
      homeBlurb: "A full oral assessment with an experienced practitioner.",
      homeMeta: "60 to 90 minutes",
      subtitle: "1 to 1 assessment \xB7 60 to 90 minutes",
      open: false,
      left: {
        paragraphs: [
          {
            text: "An assessment with an expert Tongue Tie Practitioner. A shortened or restrictive piece of tissue under the tongue can limit mobility and affect feeding, at the breast or the bottle."
          },
          {
            text: "You\u2019ll leave with context, education, referral guidance where needed, and non-surgical alternatives. Documentation for insurance requirements prior to specialist referral is available."
          }
        ]
      },
      right: {
        heading: "Your appointment includes",
        twoCol: false,
        items: [
          "Full oral assessment with an evidence-based scoring tool",
          "Palate assessment",
          "Weight check",
          "Full feeding history + assessment",
          "A bespoke plan for your baby"
        ]
      }
    }
  ]
};

// tina/config.ts
var branch = process.env.GITHUB_BRANCH || process.env.CF_PAGES_BRANCH || process.env.HEAD || process.env.BRANCH || "main";
var text = (name, label, description, extra = {}) => ({
  type: "string",
  name,
  label,
  description,
  ...extra
});
var longText = (name, label, description) => text(name, label, description, { ui: { component: "textarea" } });
var stringList = (name, label, description) => ({
  type: "string",
  name,
  label,
  description,
  list: true
});
var yesNo = (name, label, description) => ({
  type: "boolean",
  name,
  label,
  description
});
var TILE_LINKS = [
  { value: "/services", label: "Services" },
  { value: "/services#book", label: "Rates + booking" },
  { value: "/bloom-circle", label: "Bloom Circle" },
  { value: "/about", label: "About Whitney" },
  { value: "/stories", label: "Parent stories" },
  { value: "/contact", label: "Contact" }
];
var BLOOM_SERVICE = "Join Bloom Circle";
var isoDate = (value) => {
  const ok = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v.trim());
  const values = Array.isArray(value) ? value : [value];
  return values.every(ok) ? void 0 : "Use the format YYYY-MM-DD, for example 2026-12-02";
};
var editOnly = { allowedActions: { create: false, delete: false } };
var jsonFile = (name, label, file, fields) => ({
  name,
  label,
  path: "src/data",
  format: "json",
  match: { include: file },
  ui: editOnly,
  fields
});
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "images", publicFolder: "public" } },
  schema: {
    collections: [
      // ---------------------------------------------------------------- stories
      {
        name: "story",
        label: "Parent stories",
        path: "src/content/stories",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => String(values?.title || "new-story").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60)
          },
          defaultItem: () => ({
            place: "Portland",
            color: "1",
            sample: false,
            draft: true,
            order: 100
          })
        },
        fields: [
          text("title", "Headline", "A short headline about the challenge.", { isTitle: true, required: true }),
          {
            type: "string",
            name: "tag",
            label: "Topic",
            description: "Pick the closest topic. This is what the filter buttons use.",
            options: ["Tongue tie", "Milk supply", "Latch + pain", "Returning to work", "Bottle feeding", "Community"],
            required: true
          },
          { type: "string", name: "place", label: "City", options: ["Portland", "Astoria"], required: true },
          longText("excerpt", "Card teaser", "One or two sentences shown on the story card."),
          longText("going", "What was going on", "The parent's words. 3 to 5 sentences. Do not include quotation marks."),
          longText("worked", "What we worked on", "The parent's words. 3 to 5 sentences."),
          longText("now", "How it feels now", "The parent's words. 3 to 5 sentences."),
          {
            type: "string",
            name: "serviceLabel",
            label: "Related service",
            description: 'Shown in a box at the end of the story with a "Learn more" button. The button goes to the right page automatically.',
            options: [...services_default.services.map((x) => x.title), BLOOM_SERVICE],
            required: true
          },
          yesNo(
            "draft",
            "Keep hidden (draft)",
            "Turn this OFF only when the parent has approved the final wording in writing. Hidden stories do not appear on the site."
          ),
          yesNo(
            "sample",
            "This is a sample story",
            "Leave ON for placeholder stories. Turn OFF for real stories. Sample stories are labeled and hidden from Google."
          ),
          text("seoTitle", "Google title (optional)", "Leave blank to use the headline."),
          longText("metaDescription", "Google description (optional)", "One sentence for search results."),
          {
            type: "string",
            name: "color",
            label: "Card color",
            description: "Background color of this story on the Stories page.",
            options: [
              { value: "1", label: "Petal pink" },
              { value: "2", label: "Blue-grey" },
              { value: "3", label: "Sage" },
              { value: "4", label: "Dusty blush" },
              { value: "5", label: "Light blue-grey" },
              { value: "6", label: "Light sage" }
            ]
          },
          {
            type: "number",
            name: "order",
            label: "Position on the Stories page",
            description: "1 = top of the page. Lower numbers appear first."
          }
        ]
      },
      // ---------------------------------------------------------- Bloom Circle
      jsonFile("bloom", "Bloom Circle", "bloom", [
        {
          type: "object",
          name: "cancelledDates",
          label: "Skip a date",
          description: 'Add a date to remove it from the regular schedule, for example a holiday. It disappears from "Save the date" and the "Next Bloom Circle" badge.',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.date || "New date" }) },
          fields: [
            text("date", "Date", "Format YYYY-MM-DD, for example 2026-12-02", { ui: { validate: isoDate } }),
            text("note", "Reason (only you see this)", "For example: Thanksgiving week")
          ]
        },
        {
          type: "object",
          name: "extraDates",
          label: "Add an extra date",
          description: 'A one-off session that is not on the regular schedule. It shows up in "Save the date".',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.date || "New date" }) },
          fields: [
            text("date", "Date", "Format YYYY-MM-DD, for example 2026-11-10", { ui: { validate: isoDate } }),
            text("note", "Note (optional)", "For example: Guest speaker")
          ]
        },
        // The weekday, week-of-month and hour rules live in src/data/bloom.json and are not shown here.
        text("scheduleLabel", "When it meets (in words)", "Shown on the home page, Bloom Circle page and footer. For example: 1st + 3rd Wednesdays. Changing this does not change the actual dates; ask Emily for that."),
        text("timeLabel", "Time (in words)", 'Shown next to "When it meets". For example: 10am to 12pm'),
        text("venue", "Venue name", "For example: Taborspace. Shown on the home page, Bloom Circle page, contact page and footer."),
        text("venueNote", "Venue note", 'Small line above the address in the "Where we meet" box on the Bloom Circle page.'),
        text("street", "Street address"),
        text("cityLine", "City, state, zip"),
        text("mapsUrl", "Directions link", 'Where the "Get directions" button goes. Paste a Google Maps link.'),
        stringList("topics", "Topics", 'The rounded tags under "Past + upcoming topics" on the Bloom Circle page. One topic per line.')
      ]),
      // -------------------------------------------------------------- Services
      jsonFile("services", "Services + rates", "services", [
        {
          type: "object",
          name: "services",
          label: "Services",
          description: "Your main services. Each one is a card on the home page, an expandable section on the Services page, and a choice in the contact form. They are numbered automatically in this order. Drag to reorder.",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title || "New service" }) },
          fields: [
            text("title", "Service name", "Full name, shown on the Services page. For example: Tongue tie assessment + support"),
            text("shortTitle", "Short name (home page card)", "A shorter version for the home page card. For example: Tongue tie"),
            longText("homeBlurb", "Home page card text", "One or two sentences."),
            text("homeMeta", "Session length (home page card)", "For example: 60 to 90 minutes"),
            text("subtitle", "Subtitle (Services page)", "Shown under the name on the Services page."),
            {
              type: "string",
              name: "color",
              label: "Card color",
              description: "Background of the home page card, and the circle behind the number on the Services page.",
              options: [
                { value: "a", label: "Petal pink" },
                { value: "b", label: "Blue-grey" },
                { value: "c", label: "Sage" },
                { value: "d", label: "White with pink outline" }
              ]
            },
            yesNo("open", "Start opened on the Services page", "Usually only the first service."),
            {
              type: "object",
              name: "left",
              label: "Details: left column",
              description: "Shown when the service is opened on the Services page.",
              fields: [
                {
                  type: "object",
                  name: "paragraphs",
                  label: "Paragraphs",
                  list: true,
                  ui: { itemProps: (item) => ({ label: String(item?.text || "Paragraph").slice(0, 50) }) },
                  fields: [longText("text", "Text")]
                },
                {
                  type: "object",
                  name: "list",
                  label: "Checklist under the paragraphs (optional)",
                  fields: [text("heading", "Heading"), stringList("items", "Items")]
                }
              ]
            },
            {
              type: "object",
              name: "right",
              label: "Details: right column",
              description: "The checklist on the right when the service is opened. For example: What we cover.",
              fields: [
                text("heading", "Heading"),
                yesNo("twoCol", "Show in two columns"),
                stringList("items", "Items")
              ]
            }
          ]
        },
        text("cashRate", 'Price (Services page, "Payment + insurance" box)', "The large price near the bottom of the Services page. For example: $200"),
        stringList("insurance", 'Insurance accepted (Services page, "Payment + insurance" box)', "Small tags under the price. One plan per line."),
        stringList(
          "pills",
          "Quick facts under the Services page title",
          "The row of small rounded tags just under the big Services page heading. Keep each one short. Update these if the price or insurance changes."
        ),
        stringList("also", "Other things you help with (Services page)", 'Tags shown after the list of services, next to "Also supporting".')
      ]),
      // ------------------------------------------------------------------- FAQ
      jsonFile("faq", "FAQ", "faq", [
        {
          type: "object",
          name: "items",
          label: "Questions",
          description: 'The "Good to know" questions at the bottom of the Services page. Drag to reorder. If you change the price, insurance or session lengths, check the answers here too.',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.q || "New question" }) },
          fields: [
            text("q", "Question"),
            longText("a", "Answer"),
            text("linkLabel", "Link at the end of the answer (optional)", "The words to click. For example: See Bloom Circle dates"),
            {
              type: "string",
              name: "linkHref",
              label: "Link goes to (optional)",
              description: "Leave this and the link text empty for no link.",
              options: TILE_LINKS
            }
          ]
        }
      ]),
      // ----------------------------------------------------------------- About
      jsonFile("about", "About Whitney", "about", [
        text("name", "Name", "Used as the description of your photo for screen readers."),
        text("homeCred", "Credentials (home page)", 'The short line under "Hi, I\u2019m Whitney" on the home page.'),
        longText("homeBlurb", "Intro (home page)", "The paragraph under your credentials on the home page."),
        {
          type: "object",
          name: "homeFacts",
          label: "Facts (home page)",
          description: "The three big numbers under your intro on the home page. Three works best.",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.big || "Fact" }) },
          fields: [text("big", "Big text", "For example: 400+"), text("small", "Small text underneath", "For example: infants treated each year")]
        },
        text("aboutCred", "Credentials (About page)", "The full list of credentials at the top of the About page."),
        {
          type: "object",
          name: "bio",
          label: "Your story (About page)",
          description: "The paragraphs at the top of the About page. Drag to reorder.",
          list: true,
          ui: { itemProps: (item) => ({ label: String(item?.text || "Paragraph").slice(0, 50) }) },
          fields: [longText("text", "Paragraph")]
        },
        {
          type: "object",
          name: "facts",
          label: "Facts (About page)",
          description: "The big numbers under your story on the About page.",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.big || "Fact" }) },
          fields: [text("big", "Big text"), text("small", "Small text underneath")]
        },
        {
          type: "object",
          name: "timeline",
          label: "Timeline (About page)",
          description: 'The "My path" timeline on the About page, oldest first. Drag to reorder.',
          list: true,
          ui: { itemProps: (item) => ({ label: `${item?.year || ""} ${item?.title || ""}`.trim() || "New entry" }) },
          fields: [text("year", "Year", "Or a short label, for example: NHS"), text("title", "Title"), longText("text", "Description")]
        }
      ]),
      // ---------------------------------------------------------- Testimonials
      jsonFile("testimonials", "Testimonials", "testimonials", [
        {
          type: "object",
          name: "items",
          label: "Testimonials",
          description: 'The "Kind words" quotes on the home page. Only add a testimonial with written permission from the parent.',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.attribution || "New testimonial" }) },
          fields: [
            longText("quote", "Quote", "Do not include quotation marks."),
            text("attribution", "Attribution", "First name only, plus city. For example: Sam, Portland"),
            yesNo("placeholder", "This is a placeholder", "Turn OFF for a real testimonial.")
          ]
        }
      ]),
      // ------------------------------------------------------------- Site info
      // ------------------------------------------------------------ home tiles
      jsonFile("tiles", "Home page tiles", "tiles", [
        text("eyebrow", "Small heading", "For example: Not sure where to start?"),
        text("heading", "Heading"),
        {
          type: "object",
          name: "tile1",
          label: "Tile 1 (pink)",
          fields: [
            text("label", "Small label", "A few words in capitals above the text. For example: Feeding hurts"),
            text("line1", "First line", "Keep both lines short so the tiles stay even."),
            text("line2", "Second line"),
            { type: "string", name: "link", label: "Goes to", options: TILE_LINKS }
          ]
        },
        {
          type: "object",
          name: "tile2",
          label: "Tile 2 (green)",
          fields: [
            text("label", "Small label", "A few words in capitals above the text. For example: Feeding hurts"),
            text("line1", "First line", "Keep both lines short so the tiles stay even."),
            text("line2", "Second line"),
            { type: "string", name: "link", label: "Goes to", options: TILE_LINKS }
          ]
        },
        {
          type: "object",
          name: "tile3",
          label: "Tile 3 (blue)",
          fields: [
            text("label", "Small label", "A few words in capitals above the text. For example: Feeding hurts"),
            text("line1", "First line", "Keep both lines short so the tiles stay even."),
            text("line2", "Second line"),
            { type: "string", name: "link", label: "Goes to", options: TILE_LINKS }
          ]
        },
        {
          type: "object",
          name: "tile4",
          label: "Tile 4 (blush)",
          fields: [
            text("label", "Small label", "A few words in capitals above the text. For example: Feeding hurts"),
            text("line1", "First line", "Keep both lines short so the tiles stay even."),
            text("line2", "Second line"),
            { type: "string", name: "link", label: "Goes to", options: TILE_LINKS }
          ]
        }
      ]),
      jsonFile("site", "Contact + site info", "site", [
        text("phone", "Phone", "Shown on the home page, contact page and footer."),
        text("email", "Email", 'Where the "Email Whitney" links go, on the contact page and in the footer.'),
        text("astoriaPhone", "Astoria front desk phone", 'The button on the "Office visits" card on the Services page.'),
        text("bookingUrl", "Home visit booking link", 'Where the "Book a home visit" button goes. Paste your booking page link.'),
        text("instagramHandle", "Instagram name", "Shown under the home page tiles. For example: @pacificroselactation"),
        text("instagramUrl", "Instagram link", "Where the Instagram icon and links go."),
        text("facebookUrl", "Facebook link", "Where the Facebook icon and link in the footer go."),
        { type: "image", name: "portraitPhoto", label: "Whitney's photo", description: "Shown on the home page and About page. A portrait (taller than wide) works best." },
        text("name", "Business name", "Used in the footer and in the browser tab title.")
        // Not shown in the dashboard (set up by Emily): tagline, url, contactFormEndpoint, reminderFormEndpoint
      ])
    ]
  }
});
export {
  config_default as default
};
