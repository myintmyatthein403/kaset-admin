const burmeseMap: { [key: string]: string } = {
  'က': 'ka', 'ခ': 'kha', 'ဂ': 'ga', 'ဃ': 'gha', 'င': 'nga',
  'စ': 'sa', 'ဆ': 'hsa', 'ဇ': 'za', 'ဈ': 'jha', 'ည': 'nya',
  'ဋ': 'ta', 'ဌ': 'hta', 'ဍ': 'da', 'ဎ': 'dha', 'ဏ': 'na',
  'တ': 'ta', 'ထ': 'hta', 'ဒ': 'da', 'ဓ': 'dha', 'န': 'na',
  'ပ': 'pa', 'ဖ': 'pha', 'ဗ': 'ba', 'ဘ': 'bha', 'မ': 'ma',
  'ယ': 'ya', 'ရ': 'ra', 'လ': 'la', 'ဝ': 'wa', 'သ': 'tha',
  'ဟ': 'ha', 'အ': 'a',
  'ါ': 'a', 'ာ': 'a', 'ိ': 'i', 'ီ': 'i', 'ု': 'u', 'ူ': 'u', 'ေ': 'e', 'ဲ': 'ai', 'ံ': 'an', '့': '', 'း': 'h',
  '၁': '1', '၂': '2', '၃': '3', '၄': '4', '၅': '5', '၆': '6', '၇': '7', '၈': '8', '၉': '9', '၀': '0',
};

export const isBurmese = (text: string): boolean => {
  return /[\u1000-\u109F]/.test(text);
};

// Main function to generate a slug from a given title.
export const generateSlug = (title: string): string => {
  if (!title) {
    return '';
  }

  let baseSlug = '';

  if (isBurmese(title)) {
    // Transliterate Burmese to a Romanized string
    let transliterated = '';
    for (const char of title) {
      transliterated += burmeseMap[char] || char;
    }
    baseSlug = transliterated;
  } else {
    // Use the title directly for non-Burmese languages
    baseSlug = title;
  }

  // Common slugifying process: lowercase, trim, remove non-alphanumeric, replace spaces with hyphens
  return baseSlug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};
