import imported from './course-import.json';
import { Entity, L, Localized } from './schema';
import { courseNotes } from './course-notes';

export const disciplines: Record<
  string,
  { name: Localized; summary: Localized; topics: Localized; application: Localized }
> = {
  chemistry: {
    name: L('Food chemistry', 'شیمی مواد غذایی'),
    summary: L(
      'Connect molecular structure to the behaviour of food during processing and storage.',
      'ارتباط ساختار مولکولی با رفتار مواد غذایی در فرآوری و نگهداری را بررسی کنید.',
    ),
    topics: L(
      'Composition and structure; chemical reactions; ingredient functionality; analytical interpretation.',
      'ترکیب و ساختار؛ واکنش‌های شیمیایی؛ عملکرد مواد اولیه؛ تفسیر نتایج تجزیه.',
    ),
    application: L(
      'Use chemical knowledge to investigate oxidation, texture changes, ingredient interactions and product stability.',
      'از دانش شیمی برای بررسی اکسایش، تغییر بافت، برهم‌کنش مواد اولیه و پایداری محصول استفاده کنید.',
    ),
  },
  microbiology: {
    name: L('Food microbiology', 'میکروبیولوژی مواد غذایی'),
    summary: L(
      'Understand microorganisms and their roles in food safety, spoilage and fermentation.',
      'نقش میکروارگانیسم‌ها در ایمنی، فساد و تخمیر مواد غذایی را بشناسید.',
    ),
    topics: L(
      'Microbial growth; contamination routes; preservation; interpreting microbiological evidence.',
      'رشد میکروبی؛ مسیرهای آلودگی؛ نگهداری؛ تفسیر شواهد میکروبیولوژیک.',
    ),
    application: L(
      'Connect microbial behaviour to shelf-life studies, food safety investigations and controlled fermentation. Laboratory work requires supervised training.',
      'رفتار میکروبی را به بررسی ماندگاری، مطالعات ایمنی غذا و تخمیر کنترل‌شده پیوند دهید. کار آزمایشگاهی به آموزش تحت نظارت نیاز دارد.',
    ),
  },
  engineering: {
    name: L('Food engineering', 'مهندسی صنایع غذایی'),
    summary: L(
      'Study the physical principles that turn food materials into reliable, efficient processes.',
      'اصول فیزیکی تبدیل مواد غذایی به فرآیندهای قابل اتکا و کارآمد را مطالعه کنید.',
    ),
    topics: L(
      'Material and energy balances; transport phenomena; equipment; process performance.',
      'موازنه جرم و انرژی؛ پدیده‌های انتقال؛ تجهیزات؛ عملکرد فرآیند.',
    ),
    application: L(
      'Apply process thinking to heating, cooling, separation, equipment selection and resource efficiency.',
      'تفکر فرآیندی را در گرمایش، سرمایش، جداسازی، انتخاب تجهیزات و بهره‌وری منابع به کار ببرید.',
    ),
  },
  technology: {
    name: L('Food technology', 'فناوری مواد غذایی'),
    summary: L(
      'Explore how raw materials, operations and quality requirements shape a food product.',
      'نقش مواد اولیه، عملیات و الزامات کیفیت در تولید یک محصول غذایی را بررسی کنید.',
    ),
    topics: L(
      'Raw material characteristics; processing steps; preservation; product quality and defects.',
      'ویژگی مواد اولیه؛ مراحل فرآوری؛ نگهداری؛ کیفیت و عیوب محصول.',
    ),
    application: L(
      'Interpret a production flow, identify critical quality changes and propose evidence-based improvements.',
      'نمودار تولید را تفسیر کنید، تغییرات مهم کیفیت را بشناسید و بهبودهای مبتنی بر شواهد پیشنهاد دهید.',
    ),
  },
  safety: {
    name: L('Food safety & quality', 'ایمنی و کیفیت غذا'),
    summary: L(
      'Learn how measurement, prevention and documentation support a safe food supply.',
      'بیاموزید که اندازه‌گیری، پیشگیری و مستندسازی چگونه به تأمین غذای ایمن کمک می‌کنند.',
    ),
    topics: L(
      'Hazard identification; sampling; quality systems; traceability; evaluation of evidence.',
      'شناسایی مخاطرات؛ نمونه‌برداری؛ نظام‌های کیفیت؛ قابلیت ردیابی؛ ارزیابی شواهد.',
    ),
    application: L(
      'Connect analytical results with quality decisions, preventive controls and clear technical records.',
      'نتایج تجزیه را به تصمیم‌های کیفی، کنترل‌های پیشگیرانه و سوابق فنی روشن پیوند دهید.',
    ),
  },
  data: {
    name: L('Data & research methods', 'داده و روش تحقیق'),
    summary: L(
      'Develop the quantitative reasoning needed to evaluate experiments and improve food processes.',
      'استدلال کمی لازم برای ارزیابی آزمایش‌ها و بهبود فرآیندهای غذایی را پرورش دهید.',
    ),
    topics: L(
      'Experimental questions; data organization; modelling; uncertainty; reproducible analysis.',
      'پرسش آزمایشی؛ سازمان‌دهی داده؛ مدل‌سازی؛ عدم قطعیت؛ تحلیل بازتولیدپذیر.',
    ),
    application: L(
      'Use well-designed comparisons and transparent calculations to distinguish real effects from variation.',
      'با مقایسه‌های درست و محاسبات شفاف، اثر واقعی را از تغییرپذیری جدا کنید.',
    ),
  },
  foundations: {
    name: L('Scientific foundations', 'مبانی علوم'),
    summary: L(
      'Build the scientific language used throughout food science and engineering.',
      'زبان علمی مورد استفاده در علوم و مهندسی صنایع غذایی را بیاموزید.',
    ),
    topics: L(
      'Core scientific concepts; quantitative reasoning; interpreting observations; problem solving.',
      'مفاهیم پایه علمی؛ استدلال کمی؛ تفسیر مشاهده‌ها؛ حل مسئله.',
    ),
    application: L(
      'Revisit these foundations when reading laboratory results, analysing a process or evaluating a scientific claim.',
      'هنگام خواندن نتایج آزمایشگاه، تحلیل فرآیند یا ارزیابی یک ادعای علمی به این مبانی بازگردید.',
    ),
  },
  professional: {
    name: L('Professional foundations', 'مبانی عمومی و حرفه‌ای'),
    summary: L(
      'Develop the communication, social understanding and study habits that support university learning.',
      'مهارت ارتباطی، شناخت اجتماعی و عادت‌های مطالعه پشتیبان یادگیری دانشگاهی را پرورش دهید.',
    ),
    topics: L(
      'Reading and communication; contextual understanding; reflection; responsible participation.',
      'خواندن و ارتباط؛ شناخت زمینه؛ تأمل؛ مشارکت مسئولانه.',
    ),
    application: L(
      'Use these skills in collaborative projects, professional communication and responsible engagement with society.',
      'این مهارت‌ها را در پروژه‌های گروهی، ارتباط حرفه‌ای و مشارکت مسئولانه اجتماعی به کار ببرید.',
    ),
  },
  sustainability: {
    name: L('Sustainable food systems', 'سامانه‌های غذایی پایدار'),
    summary: L(
      'Examine the use of materials, water and energy across food production.',
      'مصرف مواد، آب و انرژی را در تولید غذا بررسی کنید.',
    ),
    topics: L(
      'Resource flows; waste streams; recovery options; environmental trade-offs.',
      'جریان منابع؛ پسماندها؛ گزینه‌های بازیافت؛ موازنه‌های زیست‌محیطی.',
    ),
    application: L(
      'Compare improvement options using clearly defined system boundaries and measurable resource use.',
      'گزینه‌های بهبود را با مرزهای روشن سامانه و شاخص‌های قابل اندازه‌گیری مصرف منابع مقایسه کنید.',
    ),
  },
  nutrition: {
    name: L('Food composition & nutrition', 'ترکیب غذا و تغذیه'),
    summary: L(
      'Explore the relationship between food composition, processing and nutritional properties.',
      'رابطه ترکیب، فرآوری و ویژگی‌های تغذیه‌ای غذا را بررسی کنید.',
    ),
    topics: L(
      'Nutrients; composition; processing effects; evaluating nutritional evidence.',
      'مواد مغذی؛ ترکیب؛ اثر فرآوری؛ ارزیابی شواهد تغذیه‌ای.',
    ),
    application: L(
      'Support food formulation and interpretation of composition data. This course does not confer clinical practice qualifications.',
      'به فرمولاسیون غذا و تفسیر داده‌های ترکیب کمک کنید. این درس به‌تنهایی صلاحیت فعالیت بالینی ایجاد نمی‌کند.',
    ),
  },
};

const corrected: Record<number, string> = {
  9: 'Physical Education',
  10: 'Sport I',
  23: 'Economics and Industrial Management',
  24: 'Agricultural Experimental Design I',
  25: 'Postharvest Technology',
  26: 'Practical Workshop',
  31: 'Principles of Food Engineering I',
  34: 'Principles of Food Engineering II',
  35: 'Meat and Seafood Processing Technology',
  38: 'Milk and Dairy Products Technology',
  39: 'Dairy Processing Laboratory',
  40: 'Food Canning',
  48: 'Computer Applications in Food Engineering',
  49: 'Industrial Drawing I',
  50: 'Principles of Dried Food Processing',
  54: 'Food Hygiene and Safety',
  58: 'Industrial Production of Traditional Iranian Foods',
  59: 'Diet Therapy',
  61: 'Confectionery Technology',
  63: 'Food Plant Unit Operations Design',
  64: 'Agricultural and Food Waste Recovery',
  69: 'Industrial Internship I',
  70: 'Industrial Internship II',
};
const prereqs: Record<number, number[]> = {
  11: [13],
  12: [15],
  14: [13],
  15: [18],
  16: [18],
  17: [18],
  27: [22],
  28: [27],
  30: [29],
  31: [13],
  32: [30, 17],
  33: [30, 27, 28],
  34: [31],
  35: [29, 27, 28],
  36: [30],
  37: [30],
  38: [30, 27, 28],
  39: [30, 27, 28],
  40: [33],
  41: [31],
  42: [33, 30],
  43: [30],
  44: [34],
  45: [44],
  46: [30],
  47: [24],
  48: [34],
  50: [33, 31],
  51: [17],
  52: [48],
  53: [25],
  54: [22],
  55: [27, 28],
  59: [46],
  60: [8],
  61: [41, 30],
  62: [27, 28],
  63: [45],
  67: [33],
  68: [32],
};
const coreqs: Record<number, number[]> = { 29: [12] };
const disciplineAt = (i: number): string => {
  if (i < 11) return 'professional';
  if ([11, 13, 14, 24, 48, 52, 65].includes(i)) return 'data';
  if ([12, 15, 16, 17, 18, 29, 30, 32, 36, 56].includes(i)) return 'chemistry';
  if ([22, 27, 28, 55].includes(i)) return 'microbiology';
  if ([31, 34, 44, 45, 49, 53, 63].includes(i)) return 'engineering';
  if ([47, 54, 67, 68].includes(i)) return 'safety';
  if ([51, 62, 64, 66].includes(i)) return 'sustainability';
  if ([46, 57, 59].includes(i)) return 'nutrition';
  if ([19, 20, 21].includes(i)) return 'foundations';
  return 'technology';
};
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const idAt = (i: number) => `course-${String(i + 1).padStart(3, '0')}`;
export const courses: Entity[] = imported.map((raw, i) => {
  const title = L(corrected[i] || raw.en, raw.fa);
  const tag = disciplineAt(i),
    d = disciplines[tag];
  const page =
    raw.category === 'general'
      ? 5
      : raw.category === 'basic'
        ? 6
        : raw.category === 'elective'
          ? 8
          : 7;
  return {
    id: idAt(i),
    slug: slugify(title.en),
    kind: 'courses',
    title,
    originalTitle: L(raw.en, raw.fa),
    summary: L(...courseNotes[i]),
    category: raw.category,
    tags: [tag],
    status: 'historical',
    credits: i === 63 ? 3 : raw.credits,
    originalCredits: raw.credits,
    prerequisites: (prereqs[i] || []).map(idAt),
    corequisites: (coreqs[i] || []).map(idAt),
    pdfPage: page,
    cells: raw.cells,
    sources: [
      {
        title: 'University of Tehran · 2017 curriculum',
        url: `/references/ut-fse-2017.pdf#page=${page}`,
        type: 'curriculum',
        locator: `PDF page ${page} (printed ${page - 2})`,
      },
      {
        title: 'FSE Chart Analysis · supplied workbook',
        url: '/references/fse-chart.xlsx',
        type: 'curriculum',
        locator: `FSE Chart (New Edition)!${raw.cells}`,
      },
    ],
    sections: [
      { title: L('Learning lens', 'محورهای یادگیری'), body: d.topics },
      { title: L('From classroom to practice', 'از کلاس تا کاربرد'), body: d.application },
      {
        title: L('A practical starting point', 'نقطه شروع عملی'),
        body: L(
          `Choose a published example related to ${title.en.toLowerCase()}. Explain its question, identify the measurements and describe what the evidence can and cannot establish.`,
          `یک نمونه منتشرشده مرتبط با «${title.fa}» انتخاب کنید. پرسش آن را توضیح دهید، اندازه‌گیری‌ها را مشخص کنید و محدودیت شواهد را شرح دهید.`,
        ),
      },
    ],
  };
});

// Additional alternatives explicitly listed in the PDF's general-education table.
const alternatives = [
  ['Humanity in Islam', 'انسان در اسلام'],
  ['Social and Political Rights in Islam', 'حقوق اجتماعی و سیاسی در اسلام'],
  ['Philosophy of Ethics', 'فلسفه اخلاق'],
  ['Applied Ethics and Ways of Living', 'آیین زندگی (اخلاق کاربردی)'],
  ['Practical Mysticism in Islam', 'عرفان عملی در اسلام'],
  [
    'Constitution of the Islamic Republic of Iran',
    'آشنایی با قانون اساسی جمهوری اسلامی ایران',
  ],
  ['Political Thought of Imam Khomeini', 'اندیشه سیاسی امام خمینی'],
  ['History of Islamic Culture and Civilization', 'تاریخ فرهنگ و تمدن اسلامی'],
  ['History of Imamate', 'تاریخ امامت'],
  ['Thematic Interpretation of Nahj al-Balagha', 'تفسیر موضوعی نهج‌البلاغه'],
];
alternatives.forEach(([en, fa], n) =>
  courses.push({
    id: `course-option-${n + 1}`,
    slug: slugify(en),
    kind: 'courses',
    title: L(en, fa),
    summary: L(
      'An alternative in the general-education selection groups documented in the 2017 curriculum.',
      'یکی از گزینه‌های گروه‌های انتخاب دروس عمومی در برنامه مصوب ۱۳۹۶.',
    ),
    category: 'general',
    tags: ['professional'],
    status: 'historical',
    credits: 2,
    prerequisites: [],
    corequisites: [],
    pdfPage: 5,
    sources: [
      {
        title: 'University of Tehran · 2017 curriculum',
        url: '/references/ut-fse-2017.pdf#page=5',
        type: 'curriculum',
        locator: 'PDF page 5 · general-education alternatives',
      },
    ],
    sections: [
      {
        title: L('Selection, not additional credits', 'گزینش، نه واحد اضافه'),
        body: L(
          'These alternatives belong to the documented general-education groups. Do not add every listed option to the graduation total; follow the selection rules in the original document.',
          'این گزینه‌ها به گروه‌های دروس عمومی تعلق دارند. همه گزینه‌ها را به مجموع واحدهای لازم اضافه نکنید؛ قواعد انتخاب در سند اصلی را رعایت کنید.',
        ),
      },
    ],
  }),
);
