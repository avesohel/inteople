/* ============================================================================
   Inteople — Site configuration (single source of truth)
   ----------------------------------------------------------------------------
   Edit links, contact details, social handles, product URLs and the people
   behind the virtual cards HERE. Everything below is read at runtime by
   src/scripts/main.js (homepage) and vc/vc.js (business cards).

   NOTE on SEO: the homepage nav and product cards are intentionally kept as
   real <a href> anchors in index.html so search engines can crawl them. The
   values below are the canonical copies — if you change a product URL or a
   social link here, update its matching anchor in index.html too. Search
   index.html for the old URL to find it.
   ========================================================================== */
window.INTEOPLE = {
  brand: {
    name: "Inteople",
    legalName: "Inteople Limited",
    domain: "inteople.com",
    url: "https://inteople.com",
  },

  contact: {
    email: "hello@inteople.com",
    location: "Bangladesh — working worldwide",
    support: "24 / 7 · 365 days a year",
  },

  // Contact-form email delivery via Web3Forms (https://web3forms.com).
  // 1. Go to web3forms.com, enter the inbox that should receive inquiries,
  //    and you'll be emailed a free Access Key (a UUID) instantly.
  // 2. Paste that key below. It is safe to expose in client-side code — it
  //    only allows sending TO your verified inbox, nothing else.
  // Until a real key is set, the form gracefully falls back to opening the
  // visitor's email app (mailto) so no inquiry is ever lost.
  forms: {
    web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
  },

  // Company social profiles (mirrored in index.html footer + JSON-LD).
  social: {
    linkedin: "https://www.linkedin.com/company/inteople/",
    twitter: "https://twitter.com/Inteopleltd",
    facebook: "https://www.facebook.com/inteople",
  },

  // Product / portfolio links (mirrored as product-card anchors in index.html).
  products: {
    healodex: "https://healodex.com",
    drHealodex: "https://dr.healodex.com",
    bnhs: "https://bnhs.healodex.com",
    ownbooks: "https://ownbooks.ai",
    replyflow: "https://aireply.com",
  },

  // People behind the /vc/ business cards. Keyed by page slug (vc/<key>.html).
  // `slug` is the downloaded .vcf filename and may differ from the page name.
  people: {
    alisohel: {
      slug: "alisohel",
      name: "SM Mohammad Ali",
      nickname: "Ali Sohel",
      role: "Founder & CTO",
      org: "Inteople",
      email: "hello@inteople.com",
      emails: ["hello@inteople.com", "avesohel@gmail.com"],
      phone: "+880 1819 883 233",
      phones: [
        { label: "Personal mobile", number: "+880 1819 883 233" },
        { label: "Office mobile", number: "+880 1999 989 050" },
        { label: "Office landline 1", number: "+880 2 488 14855" },
        { label: "Office landline 2", number: "+880 2 488 14856" },
        { label: "Office landline 3", number: "+880 2 488 14857" },
      ],
      address: {
        street: "House 32 & 34, Flat 4C, Road 7, Block C",
        locality: "Niketon, Gulshan 1",
        region: "Dhaka",
        postalCode: "1212",
        country: "Bangladesh",
      },
      website: "https://inteople.com",
      linkedin: "https://www.linkedin.com/in/alisohel/",
      photo: "/src/images/team/sohel.webp",
      qr: "/src/images/qr/qr-sohel.png",
      bio: "Founder & CTO of Inteople. Building AI, SaaS, mobile and IoT products for healthtech, fintech, agrotech and edutech.",
    },
    propel: {
      slug: "propel",
      name: "M R N Propel",
      role: "Chief Executive Officer",
      org: "Inteople",
      email: "ceo@inteople.com",
      emails: ["ceo@inteople.com", "mirzapropel@gmail.com"],
      phone: "+1 516 233 4811",
      phones: [
        { label: "USA", number: "+1 516 233 4811", whatsapp: true },
        { label: "Bangladesh", number: "+880 131 144 9999", whatsapp: true },
      ],
      address: {
        street: "House 32 & 34, Flat 4C, Road 7, Block C",
        locality: "Niketon, Gulshan 1",
        region: "Dhaka",
        postalCode: "1212",
        country: "Bangladesh",
      },
      website: "https://inteople.com",
      linkedin: "https://www.linkedin.com/company/inteople/",
      photo: "/src/images/team/propel.webp",
      qr: "/src/images/qr/qr-propel.png",
      bio: "CEO of Inteople, leading vision and growth across our platforms.",
    },
    ahsan: {
      slug: "ahsan",
      name: "Mohammad Ahsan",
      role: "Director, Finance",
      org: "Inteople",
      email: "ahsan@inteople.com",
      phone: "",
      website: "https://inteople.com",
      linkedin: "https://www.linkedin.com/company/inteople/",
      photo: "",
      bio: "Director of Finance at Inteople, overseeing financial strategy and operations.",
    },
    nasim: {
      slug: "nasim",
      name: "Mohammad Nasim Ahmen",
      role: "Director, Admin",
      org: "Inteople",
      email: "nasim@inteople.com",
      phone: "",
      website: "https://inteople.com",
      linkedin: "https://www.linkedin.com/company/inteople/",
      photo: "",
      bio: "Director of Admin at Inteople, leading administration and operations.",
    },
  },
};
