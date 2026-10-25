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
    "Tricare + OHP accepted",
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
      num: "01",
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
      num: "02",
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
      num: "03",
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
      num: "04",
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
          label: "Cancelled dates",
          description: "Add a date to remove it from the regular schedule, for example a holiday.",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.date || "New date" }) },
          fields: [
            text("date", "Date", "Format YYYY-MM-DD, for example 2026-12-02", { ui: { validate: isoDate } }),
            text("note", "Reason (optional, for your own reference)", "For example: Thanksgiving week")
          ]
        },
        {
          type: "object",
          name: "extraDates",
          label: "Extra dates",
          description: "One-off sessions that are not on the regular schedule.",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.date || "New date" }) },
          fields: [
            text("date", "Date", "Format YYYY-MM-DD, for example 2026-11-10", { ui: { validate: isoDate } }),
            text("note", "Note (optional)", "For example: Guest speaker")
          ]
        },
        text("venue", "Venue"),
        text("venueNote", "Venue note"),
        text("street", "Street address"),
        text("cityLine", "City, state, zip"),
        text("mapsUrl", "Directions link"),
        stringList("topics", "Past + upcoming topics"),
        // The weekday, week-of-month and hour rules live in src/data/bloom.json and are not shown here.
        text("scheduleLabel", "Schedule label (shown on the site)", "For example: 1st + 3rd Wednesdays"),
        text("timeLabel", "Time label (shown on the site)", "For example: 10am to 12pm")
      ]),
      // -------------------------------------------------------------- Services
      jsonFile("services", "Services + rates", "services", [
        text("cashRate", "Cash rate", "For example: $200"),
        stringList("insurance", "Insurance badges"),
        stringList("pills", "Highlights under the page title"),
        stringList("also", '"Also supporting" chips'),
        {
          type: "object",
          name: "services",
          label: "Services",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title || "New service" }) },
          fields: [
            text("num", "Number", "For example: 01"),
            { type: "string", name: "color", label: "Card color", options: ["a", "b", "c", "d"] },
            text("title", "Title"),
            text("shortTitle", "Short title (home page card)"),
            longText("homeBlurb", "Home page card text"),
            text("homeMeta", "Home page card duration"),
            text("subtitle", "Subtitle (services page)"),
            yesNo("open", "Open by default"),
            {
              type: "object",
              name: "left",
              label: "Left column",
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
                  label: "Checklist (optional)",
                  fields: [text("heading", "Heading"), stringList("items", "Items")]
                }
              ]
            },
            {
              type: "object",
              name: "right",
              label: "Right column",
              fields: [
                text("heading", "Heading"),
                yesNo("twoCol", "Show in two columns"),
                stringList("items", "Items")
              ]
            }
          ]
        }
      ]),
      // ------------------------------------------------------------------- FAQ
      jsonFile("faq", "FAQ", "faq", [
        {
          type: "object",
          name: "items",
          label: "Questions",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.q || "New question" }) },
          fields: [
            text("q", "Question"),
            longText("a", "Answer"),
            text("linkLabel", "Link text (optional)"),
            text("linkHref", "Link address (optional)", "For example: /bloom-circle")
          ]
        }
      ]),
      // ----------------------------------------------------------------- About
      jsonFile("about", "About Whitney", "about", [
        text("name", "Name"),
        text("homeCred", "Credentials (home page)"),
        text("aboutCred", "Credentials (about page)"),
        longText("homeBlurb", "Short intro (home page)"),
        {
          type: "object",
          name: "bio",
          label: "Bio paragraphs (about page)",
          list: true,
          ui: { itemProps: (item) => ({ label: String(item?.text || "Paragraph").slice(0, 50) }) },
          fields: [longText("text", "Text")]
        },
        {
          type: "object",
          name: "homeFacts",
          label: "Facts (home page)",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.big || "Fact" }) },
          fields: [text("big", "Big text"), text("small", "Small text")]
        },
        {
          type: "object",
          name: "facts",
          label: "Facts (about page)",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.big || "Fact" }) },
          fields: [text("big", "Big text"), text("small", "Small text")]
        },
        {
          type: "object",
          name: "timeline",
          label: "Timeline",
          list: true,
          ui: { itemProps: (item) => ({ label: `${item?.year || ""} ${item?.title || ""}`.trim() || "New entry" }) },
          fields: [text("year", "Year or label"), text("title", "Title"), longText("text", "Description")]
        }
      ]),
      // ---------------------------------------------------------- Testimonials
      jsonFile("testimonials", "Testimonials", "testimonials", [
        {
          type: "object",
          name: "items",
          label: "Testimonials",
          description: "Only add a testimonial with written permission from the parent.",
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
      jsonFile("site", "Contact + site info", "site", [
        text("phone", "Phone"),
        text("email", "Email"),
        text("astoriaPhone", "Astoria front desk phone"),
        text("bookingUrl", "Home visit booking link"),
        text("instagramHandle", "Instagram handle"),
        text("instagramUrl", "Instagram link"),
        text("facebookUrl", "Facebook link"),
        { type: "image", name: "portraitPhoto", label: "Whitney's photo" },
        text("tagline", "Tagline"),
        text("name", "Business name"),
        text("url", "Website address"),
        text("contactFormEndpoint", "Contact form address (Emily sets this)"),
        text("reminderFormEndpoint", "Reminder form address (Emily sets this)")
      ])
    ]
  }
});
export {
  config_default as default
};
