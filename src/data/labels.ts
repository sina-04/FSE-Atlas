import type { Kind } from './schema';
const L = (en: string, fa: string) => ({ en, fa });
export const kindLabels: Record<Kind, { en: string; fa: string }> = {
  courses: L('Courses', 'درس‌ها'),
  careers: L('Careers', 'مسیرهای شغلی'),
  research: L('Research areas', 'حوزه‌های پژوهش'),
  skills: L('Skills', 'مهارت‌ها'),
  resources: L('Learning resources', 'منابع یادگیری'),
  specializations: L('Graduate specializations', 'گرایش‌های تحصیلات تکمیلی'),
  programs: L('Graduate programmes', 'برنامه‌های تحصیلات تکمیلی'),
  faculty: L('Faculty & research groups', 'استادان و گروه‌های پژوهشی'),
  countries: L('Country guides', 'راهنمای کشورها'),
  immigration: L('International pathways', 'مسیرهای بین‌المللی'),
  positions: L('Research positions', 'موقعیت‌های پژوهشی'),
};
export const categoryLabels: Record<string, { en: string; fa: string }> = {
  general: L('General education', 'دروس عمومی'),
  basic: L('Foundational sciences', 'دروس پایه'),
  specialized: L('Core food sciences', 'دروس تخصصی'),
  elective: L('Elective options', 'دروس انتخابی'),
  internship: L('Industrial internships', 'کارورزی'),
  chemistry: L('Chemistry', 'شیمی'),
  microbiology: L('Microbiology', 'میکروبیولوژی'),
  engineering: L('Engineering', 'مهندسی'),
  technology: L('Technology', 'فناوری'),
  safety: L('Safety & quality', 'ایمنی و کیفیت'),
  data: L('Data & methods', 'داده و روش تحقیق'),
  foundations: L('Foundations', 'مبانی علوم'),
  professional: L('Professional skills', 'مهارت حرفه‌ای'),
  sustainability: L('Sustainability', 'پایداری'),
  nutrition: L('Composition & nutrition', 'ترکیب و تغذیه'),
  international: L('International', 'بین‌المللی'),
  reference: L('English · reference', 'انگلیسی · منبع مرجع'),
  'research-group': L('Research group', 'گروه پژوهشی'),
};
export const countryNames: Record<string, { en: string; fa: string }> = {
  germany: L('Germany', 'آلمان'),
  netherlands: L('The Netherlands', 'هلند'),
  canada: L('Canada', 'کانادا'),
};
