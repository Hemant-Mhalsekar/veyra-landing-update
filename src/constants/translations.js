export const API_URL = "https://script.google.com/macros/s/AKfycbxamsuAn-GftmJxzgYXwVhrId6AG4gqcrVM-91Yc8bw6piR3dhMPXGiuZHGEI5zAXRA/exec";

export const TIMER_DURATION = 48 * 60 * 60 * 1000;
export const RESET_DELAY    = 15 * 60 * 1000;
export const TIMER_KEY      = "veyraLoopTimer";
export const POPUP_DELAY    = 5000;

export const COUNTRIES = [
  { code: "+965", label: "🇰🇼 +965", name: "Kuwait" },
  { code: "+91",  label: "🇮🇳 +91",  name: "India"  },
  { code: "+971", label: "🇦🇪 +971", name: "UAE"    },
];

export const PHONE_RULES = {
  "+965": { min: 8,  max: 8,  msgKey: "kwPhone"    },
  "+91":  { min: 10, max: 10, msgKey: "indiaPhone"  },
  "+971": { min: 9,  max: 9,  msgKey: "uaePhone"    },
};

export const errorTexts = {
  en: {
    nameRequired:    "Please enter your name.",
    nameShort:       "Name must be at least 2 characters.",
    phoneRequired:   "Please enter your phone number.",
    phoneDigitsOnly: "Phone must contain only digits.",
    kwPhone:         "Kuwait numbers must be exactly 8 digits.",
    indiaPhone:      "India numbers must be exactly 10 digits.",
    uaePhone:        "UAE numbers must be exactly 9 digits.",
    phoneGeneric:    "Phone number must be 7 to 15 digits.",
    emailRequired:   "Please enter your email.",
    emailInvalid:    "Please enter a valid email address.",
  },
  ar: {
    nameRequired:    "يرجى إدخال الاسم.",
    nameShort:       "يجب أن يحتوي الاسم على حرفين على الأقل.",
    phoneRequired:   "يرجى إدخال رقم الهاتف.",
    phoneDigitsOnly: "رقم الهاتف يجب أن يحتوي على أرقام فقط.",
    kwPhone:         "رقم الكويت يجب أن يكون 8 أرقام.",
    indiaPhone:      "رقم الهند يجب أن يكون 10 أرقام.",
    uaePhone:        "رقم الإمارات يجب أن يكون 9 أرقام.",
    phoneGeneric:    "رقم الهاتف يجب أن يكون بين 7 و 15 رقمًا.",
    emailRequired:   "يرجى إدخال البريد الإلكتروني.",
    emailInvalid:    "يرجى إدخال بريد إلكتروني صحيح.",
  },
};

export const translations = {
  en: {
    heroEyebrow:  "FREEZE-DRIED FRUIT · KUWAIT",
    heroTitle:    ["Most \"healthy\" snacks", "are sugar in disguise.", "This isn't."],
    heroDesc:     "Freeze-dried fruit made for people who train, work, and care about what goes into their body.",
    heroPoints:   ["100% Real Fruit", "No Added Sugar", "No Preservatives"],
    cta:          "Get 10% Discount on Early Access",
    ctaSubtext:   "Limited first batch. Early access closes soon.",

    waitlistTitle:    "Get 10% off your first order",
    waitlistDesc:     "Early access is limited to the first batch.",
    emailPlaceholder: "Enter your email",
    popupBenefits: [
      "10% launch code for first batch",
      "Private WhatsApp early-access list",
      "Limited slots before public release",
    ],

    snackTitle: ["Real fruit. Zero nonsense.", "Built for real life."],
    snackDesc:  "Freeze-dried fruit snacks for gym days, workdays, and everything in between.",
    snackNote:  "Real fruit. No sugar. No compromises.",

    problemTitle: "The Snack Problem No One Talks About",
    problems: [
      "Snacks marketed as healthy, loaded with sugar.",
      "Energy that spikes… then crashes.",
      "Messy, inconvenient food you stop carrying.",
    ],
    problemFooter: "VEYRA exists because snacking shouldn't punish your body.",

    useCases: [
      { title: "For the Gym",  desc: "Fast fuel. No bloating. No crash." },
      { title: "At Your Desk", desc: "Clean energy without killing focus." },
      { title: "On the Go",    desc: "A snack you don't have to justify." },
    ],

    transformText:        "Same fruit.",
    transformTextAccent:  "Smarter form.",

    earlyTitle: "Early members get rewarded.",
    earlyBenefits: [
      "First batch access",
      "Priority stock before sell-out",
      "10% Early Access to Premium Code",
    ],
    preferEmail: "Prefer email updates?",
    trustText:   "No spam. One launch email.",

    whatsappTitle:   "Join the WhatsApp Group",
    whatsappDesc:    "Get early access updates and launch alerts.",
    namePlaceholder: "Your name",
    phonePlaceholder:"Phone number",
    formNote:        "We'll only message you for launch updates.",

    footerLaunching: "Launching soon in Kuwait",
    footerFulfilled: "Fulfilled locally",
    footerEmail:     "teamveyraco@gmail.com",
    footerPrivacy:   "Privacy Policy",
    footerTerms:     "Terms of Service",

    timerRunning: "Early access closes in",
    timerClosed:  "Early access closing soon",
    langToggle:   "العربية",
  },

  ar: {
    heroEyebrow:  "فاكهة مجففة بالتجميد · الكويت",
    heroTitle:    ["معظم الوجبات الخفيفة \"الصحية\"", "تحتوي على سكر مخفي.", "هذا ليس كذلك."],
    heroDesc:     "فاكهة مجففة بالتجميد مصنوعة للأشخاص الذين يتمرنون، يعملون، ويهتمون بما يدخل إلى أجسامهم.",
    heroPoints:   ["فاكهة حقيقية 100%", "بدون سكر مضاف", "بدون مواد حافظة"],
    cta:          "احصل على خصم 10٪ مع الوصول المبكر",
    ctaSubtext:   "الكمية الأولى محدودة. ينتهي الوصول المبكر قريبًا.",

    waitlistTitle:    "احصل على خصم 10٪ على أول طلب",
    waitlistDesc:     "الوصول المبكر محدود بالدفعة الأولى.",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    popupBenefits: [
      "كود خصم 10٪ للدفعة الأولى",
      "قائمة واتساب خاصة للوصول المبكر",
      "عدد محدود قبل الإطلاق الرسمي",
    ],

    snackTitle: ["فاكهة حقيقية. بدون إضافات.", "مصممة للحياة الواقعية."],
    snackDesc:  "وجبات خفيفة من الفاكهة المجففة بالتجميد لأيام الجيم والعمل وكل ما بينهما.",
    snackNote:  "فاكهة حقيقية. بدون سكر. بدون تنازلات.",

    problemTitle: "مشكلة الوجبات الخفيفة التي لا يتحدث عنها أحد",
    problems: [
      "وجبات تُسوّق على أنها صحية ومليئة بالسكر.",
      "طاقة ترتفع بسرعة… ثم تنخفض فجأة.",
      "أطعمة غير عملية تتوقف عن حملها.",
    ],
    problemFooter: "VEYRA وُجدت لأن الوجبات الخفيفة لا يجب أن تضر بجسمك.",

    useCases: [
      { title: "للجيم",        desc: "طاقة سريعة. بدون انتفاخ. بدون هبوط." },
      { title: "أثناء العمل",  desc: "طاقة نظيفة بدون تشتيت التركيز." },
      { title: "أثناء التنقل", desc: "وجبة خفيفة بلا تبرير." },
    ],

    transformText:       "نفس الفاكهة.",
    transformTextAccent: "بشكل أذكى.",

    earlyTitle: "الأعضاء الأوائل يحصلون على مزايا.",
    earlyBenefits: [
      "الوصول إلى أول دفعة",
      "أولوية قبل نفاد الكمية",
      "خصم وصول مبكر 10٪ إلى كود مميز",
    ],
    preferEmail: "تفضل التحديثات عبر البريد الإلكتروني؟",
    trustText:   "لا رسائل مزعجة. رسالة واحدة عند الإطلاق.",

    whatsappTitle:    "انضم إلى مجموعة واتساب",
    whatsappDesc:     "احصل على تحديثات الوصول المبكر وتنبيهات الإطلاق.",
    namePlaceholder:  "الاسم",
    phonePlaceholder: "رقم الهاتف",
    formNote:         "سنراسلك فقط بتحديثات الإطلاق.",

    footerLaunching: "الإطلاق قريبًا في الكويت",
    footerFulfilled: "التجهيز محليًا",
    footerEmail:     "teamveyraco@gmail.com",
    footerPrivacy:   "سياسة الخصوصية",
    footerTerms:     "شروط الاستخدام",

    timerRunning: "ينتهي الوصول المبكر خلال",
    timerClosed:  "سينتهي الوصول المبكر قريباً",
    langToggle:   "English",
  },
};
