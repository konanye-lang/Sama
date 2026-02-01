/* =========================================================
   data.js — (نسخة متوافقة مع app.js)
   ✅ تثبيت أرقام خدمة الشركات
   ✅ الأقسام يدوية بالكامل
   ✅ متغيرات ظاهرة لـ app.js عبر window.*
   ========================================================= */

window.SERVICE_NUMBERS = {
  yemen: "1100",   // يمن موبايل
  sabafon: "111",  // سبأفون
  you: "1017"      // YOU
};

window.CATEGORIES = [
  "الأحدث",
  "الأكثر تحميلاً",
  "زوامل",
  "أناشيد",
  "أدعية",
  "شيلات",
  "أشعار",
  "أغاني"

];

window.COMPANIES = [
  { key: "yemen",   name: "Yemen Mobile", logo: "media/company/yemen.png" },
  { key: "sabafon", name: "Sabafon",      logo: "media/company/sabafon.png" },
  { key: "you",     name: "YOU",          logo: "media/company/you.png" }
];

/*
  ✅ تنسيق إضافة نغمة (Template)

  {
    id: "unique-id",                    // اختياري (لو تركته فاضي يتم توليده تلقائيًا)
    title: "اسم النغمة",                // مطلوب
    categories: ["زوامل", "الأكثر تحميلًا"],  // قسم واحد أو عدة أقسام
    createdAt: "2026-01-04",            // اختياري (ISO). لو لم تضعه: ترتيب الملف (الأعلى أحدث)
    rank: { "زوامل": 1, "الأكثر تحميلًا": 2 }, // اختياري: ترقيم/ترتيب يدوي داخل كل قسم
    image: "AUTO",                      // للأقسام بالاسم فقط: اكتب AUTO أو اتركه فارغ وسيُولد تلقائيًا
    audio: "ringtones/audio/file.mp3",
    downloads: 0,                 // اختياري: عدد التحميلات (لترتيب قسم الأكثر تحميلًا)
    codes: { yemen: { code: "..." }, sabafon: { code: "..." }, you: { code: "..." } }
  }
*/

window.RINGTONES = [
 {
    id: "bsry_ma_allh_salm_almsawdy",
    title: "بسري مع الله",
    munshid: "سالم المسعودي",
    categories: ["زوامل", "الأكثر تحميلاً"],
    image: "ringtones/images/salm_almsawdy.jpg",
    audio: "ringtones/audio/bsry-ma-allah.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200011497" },
      sabafon: { code: "إضافة 26613" },
      you:     { code: "27733" }
    }
  },
  {
    id: "tdhytna_sqr_allahjy",
    title: "تضحيتنا",
    munshid: "صقر اللاحجي",
    categories: ["أشعار"],
    image: "ringtones/images/sqr_allahjy.jpg",
    audio: "ringtones/audio/tdhytna.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200011660" },
      sabafon: { code: "إضافة 25944" },
      you:     { code: "" }
    }
  },
  {
    id: "hsbna_allh_salm_almsawdy",
    title: "حسبنا الله",
    munshid: "سالم المسعودي",
    categories: ["الأحدث", "زوامل"],
    image: "ringtones/images/salm_almsawdy.jpg",
    audio: "ringtones/audio/hsbna-allah.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200011732" },
      sabafon: { code: "إضافة 26717" },
      you:     { code: "27735" }
    }
  },
  {
    id: "shab_alansar_ltf_alqhwm",
    title: "شعب الأنصار",
    categories: ["زوامل", "الأكثر تحميلاً"],
    image: "ringtones/images/ltf_alqhwm.jpg",
    audio: "ringtones/audio/shab-alansar.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200010905" },
      sabafon: { code: "إضافة 26311" },
      you:     { code: "" }
    }
  },
  {
    id: "shhr_alghfran_yasr_almtry",
    title: "شهر الغفران",
    munshid: "ياسر المطري",
    categories: ["الأحدث", "أناشيد"],
    image: "ringtones/images/yasr_almtry.jpg",
    audio: "ringtones/audio/shhr-alghfran.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200010808" },
      sabafon: { code: "إضافة 26823" },
      you:     { code: "" }
    }
  },
  {
    id: "ala_drb_alshhada_salm_almsawdy",
    title: "على درب الشهادة",
    munshid: "سالم المسعودي",
    categories: ["الأحدث", "زوامل"],
    image: "ringtones/images/salm_almsawdy.jpg",
    audio: "ringtones/audio/ala-drb-alshhada.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200013170" },
      sabafon: { code: "إضافة 27619" },
      you:     { code: "27740" }
    }
  },
  {
    id: "qrar_snaa_sqr_allahjy",
    title: "قرار صنعاء",
    munshid: "صقر اللاحجي",
    categories: ["الأحدث", "أشعار"],
    image: "ringtones/images/sqr_allahjy.jpg",
    audio: "ringtones/audio/qrar-snaa.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200011664" },
      sabafon: { code: "إضافة 25847" },
      you:     { code: "" }
    }
  },
  {
    id: "mkarm_alakhlaq_yasr_almtry",
    title: "مكارم الأخلاق",
    munshid: "ياسر المطري",
    categories: ["الأحدث", "أدعية"],
    image: "ringtones/images/yasr_almtry.jpg",
    audio: "ringtones/audio/mkarm-alakhlaq.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200010818" },
      sabafon: { code: "إضافة 25883" },
      you:     { code: "" }
    }
  },
  {
    id: "mn_ajlk_ltf_alqhwm",
    title: "من أجلك",
    munshid: "لطف القحوم",
    categories: ["الأحدث", "زوامل"],
    image: "ringtones/images/ltf_alqhwm.jpg",
    audio: "ringtones/audio/mn-ajlk.mp3",
    createdAt: "2026-01-08T00:00:00Z",
rank: {
    "زوامل": 1,
  },
    codes: {
      yemen:   { code: "5200011137" },
      sabafon: { code: "" },
      you:     { code: "" }
    }
  },
  {
    id: "mnajaa_tayb_yasr_almtry",
    title: "مناجاة تائب",
    munshid: "ياسر المطري",
    categories: ["الأحدث", "أناشيد"],
    image: "ringtones/images/yasr_almtry.jpg",
    audio: "ringtones/audio/mnajaa-tayb.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200010814" },
      sabafon: { code: "إضافة 26819" },
      you:     { code: "" }
    }
  },
  {
    id: "wmtany_yasr_almtry",
    title: "ومتعني",
    munshid: "ياسر المطري",
    categories: ["الأحدث", "أدعية"],
    image: "ringtones/images/yasr_almtry.jpg",
    audio: "ringtones/audio/wmtany.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200010756" },
      sabafon: { code: "إضافة 25901" },
      you:     { code: "" }
    }
  },
  {
    id: "yawyl_sqr_allahjy",
    title: "ياويل",
    munshid: "صقر اللاحجي",
    categories: ["الأحدث", "أشعار"],
    image: "ringtones/images/sqr_allahjy.jpg",
    audio: "ringtones/audio/yawyl.mp3",
    createdAt: "2026-01-08T00:00:00Z",
    codes: {
      yemen:   { code: "5200011045" },
      sabafon: { code: "إضافة 25742" },
      you:     { code: "" }
    }
  },
];
