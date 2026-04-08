export interface LearningItem {
  char: string;
  name: string;
  speech: string;
  lang: string;
  hasIcon?: boolean;
  shapeColor?: string;
  isColor?: boolean;
}

export interface Category {
  title: string;
  color: string;
  icon: string;
  cardClass: string;
  items: LearningItem[];
}

const letterWords: Record<string, string> = {
  A: 'Apple', B: 'Bear', C: 'Cat', D: 'Dog', E: 'Elephant',
  F: 'Fish', G: 'Grape', H: 'House', I: 'Ice Cream', J: 'Jellyfish',
  K: 'Kite', L: 'Lion', M: 'Moon', N: 'Nest', O: 'Orange',
  P: 'Penguin', Q: 'Queen', R: 'Rainbow', S: 'Star', T: 'Turtle',
  U: 'Umbrella', V: 'Violin', W: 'Whale', X: 'Xylophone', Y: 'Yak',
  Z: 'Zebra',
};

export const data: Record<string, Category> = {
  english: {
    title: 'English Letters',
    color: '#60A5FA',
    icon: '\uD83D\uDD24',
    cardClass: 'card-english',
    items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => ({
      char: c,
      name: `${c} is for ${letterWords[c]}`,
      speech: `${c.toLowerCase()}. ${c} is for ${letterWords[c]}`,
      lang: 'en-US',
      hasIcon: true,
    })),
  },
  arabic: {
    title: 'Arabic Letters',
    color: '#4ADE80',
    icon: '\uD83D\uDD4C',
    cardClass: 'card-arabic',
    items: [
      { char: '\u0623', name: '\u0623\u0644\u0641', speech: '\u0623\u064E\u0644\u0650\u0641\u0652' },
      { char: '\u0628', name: '\u0628\u0627\u0621', speech: '\u0628\u064E\u0627\u0621\u0652' },
      { char: '\u062A', name: '\u062A\u0627\u0621', speech: '\u062A\u064E\u0627\u0621\u0652' },
      { char: '\u062B', name: '\u062B\u0627\u0621', speech: '\u062B\u064E\u0627\u0621\u0652' },
      { char: '\u062C', name: '\u062C\u064A\u0645', speech: '\u062C\u0650\u064A\u0645\u0652' },
      { char: '\u062D', name: '\u062D\u0627\u0621', speech: '\u062D\u064E\u0627\u0621\u0652' },
      { char: '\u062E', name: '\u062E\u0627\u0621', speech: '\u062E\u064E\u0627\u0621\u0652' },
      { char: '\u062F', name: '\u062F\u0627\u0644', speech: '\u062F\u064E\u0627\u0644\u0652' },
      { char: '\u0630', name: '\u0630\u0627\u0644', speech: '\u0630\u064E\u0627\u0644\u0652' },
      { char: '\u0631', name: '\u0631\u0627\u0621', speech: '\u0631\u064E\u0627\u0621\u0652' },
      { char: '\u0632', name: '\u0632\u0627\u064A', speech: '\u0632\u064E\u0627\u064A\u0652' },
      { char: '\u0633', name: '\u0633\u064A\u0646', speech: '\u0633\u0650\u064A\u0646\u0652' },
      { char: '\u0634', name: '\u0634\u064A\u0646', speech: '\u0634\u0650\u064A\u0646\u0652' },
      { char: '\u0635', name: '\u0635\u0627\u062F', speech: '\u0635\u064E\u0627\u062F\u0652' },
      { char: '\u0636', name: '\u0636\u0627\u062F', speech: '\u0636\u064E\u0627\u062F\u0652' },
      { char: '\u0637', name: '\u0637\u0627\u0621', speech: '\u0637\u064E\u0627\u0621\u0652' },
      { char: '\u0638', name: '\u0638\u0627\u0621', speech: '\u0638\u064E\u0627\u0621\u0652' },
      { char: '\u0639', name: '\u0639\u064A\u0646', speech: '\u0639\u064E\u064A\u0652\u0646\u0652' },
      { char: '\u063A', name: '\u063A\u064A\u0646', speech: '\u063A\u064E\u064A\u0652\u0646\u0652' },
      { char: '\u0641', name: '\u0641\u0627\u0621', speech: '\u0641\u064E\u0627\u0621\u0652' },
      { char: '\u0642', name: '\u0642\u0627\u0641', speech: '\u0642\u064E\u0627\u0641\u0652' },
      { char: '\u0643', name: '\u0643\u0627\u0641', speech: '\u0643\u064E\u0627\u0641\u0652' },
      { char: '\u0644', name: '\u0644\u0627\u0645', speech: '\u0644\u064E\u0627\u0645\u0652' },
      { char: '\u0645', name: '\u0645\u064A\u0645', speech: '\u0645\u0650\u064A\u0645\u0652' },
      { char: '\u0646', name: '\u0646\u0648\u0646', speech: '\u0646\u064F\u0648\u0646\u0652' },
      { char: '\u0647', name: '\u0647\u0627\u0621', speech: '\u0647\u064E\u0627\u0621\u0652' },
      { char: '\u0648', name: '\u0648\u0627\u0648', speech: '\u0648\u064E\u0627\u0648\u0652' },
      { char: '\u064A', name: '\u064A\u0627\u0621', speech: '\u064A\u064E\u0627\u0621\u0652' },
    ].map(i => ({ ...i, lang: 'ar-SA' })),
  },
  numbers: {
    title: 'Numbers',
    color: '#FB923C',
    icon: '\uD83D\uDD22',
    cardClass: 'card-numbers',
    items: Array.from({ length: 20 }, (_, i) => ({
      char: String(i + 1),
      name: (i + 1).toString(),
      speech: String(i + 1),
      lang: 'en-US',
    })),
  },
  shapes: {
    title: 'Shapes',
    color: '#C084FC',
    icon: '\uD83D\uDD37',
    cardClass: 'card-shapes',
    items: [
      { char: '\u25CF', name: 'Circle', shapeColor: '#60A5FA' },
      { char: '\u25A0', name: 'Square', shapeColor: '#F87171' },
      { char: '\u25B2', name: 'Triangle', shapeColor: '#4ADE80' },
      { char: '\u2B1F', name: 'Pentagon', shapeColor: '#FACC15' },
      { char: '\u2B21', name: 'Hexagon', shapeColor: '#FB923C' },
      { char: '\u2B50', name: 'Star', shapeColor: '#FACC15' },
      { char: '\uD83D\uDC8E', name: 'Diamond', shapeColor: '#C084FC' },
      { char: '\u2665', name: 'Heart', shapeColor: '#FF6B9D' },
    ].map(i => ({ ...i, speech: i.name, lang: 'en-US' })),
  },
  arabicNumbers: {
    title: '\u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0639\u0631\u0628\u064A\u0629',
    color: '#F87171',
    icon: '\uD83D\uDD22',
    cardClass: 'card-arabic-numbers',
    items: [
      { char: '\u0661', name: '\u0648\u0627\u062D\u062F', speech: '\u0648\u064E\u0627\u062D\u0650\u062F\u0652' },
      { char: '\u0662', name: '\u0627\u062B\u0646\u0627\u0646', speech: '\u0627\u0650\u062B\u0652\u0646\u064E\u0627\u0646\u0652' },
      { char: '\u0663', name: '\u062B\u0644\u0627\u062B\u0629', speech: '\u062B\u064E\u0644\u064E\u0627\u062B\u064E\u0629\u0652' },
      { char: '\u0664', name: '\u0623\u0631\u0628\u0639\u0629', speech: '\u0623\u064E\u0631\u0652\u0628\u064E\u0639\u064E\u0629\u0652' },
      { char: '\u0665', name: '\u062E\u0645\u0633\u0629', speech: '\u062E\u064E\u0645\u0652\u0633\u064E\u0629\u0652' },
      { char: '\u0666', name: '\u0633\u062A\u0629', speech: '\u0633\u0650\u062A\u0651\u064E\u0629\u0652' },
      { char: '\u0667', name: '\u0633\u0628\u0639\u0629', speech: '\u0633\u064E\u0628\u0652\u0639\u064E\u0629\u0652' },
      { char: '\u0668', name: '\u062B\u0645\u0627\u0646\u064A\u0629', speech: '\u062B\u064E\u0645\u064E\u0627\u0646\u0650\u064A\u064E\u0629\u0652' },
      { char: '\u0669', name: '\u062A\u0633\u0639\u0629', speech: '\u062A\u0650\u0633\u0652\u0639\u064E\u0629\u0652' },
      { char: '\u0661\u0660', name: '\u0639\u0634\u0631\u0629', speech: '\u0639\u064E\u0634\u064E\u0631\u064E\u0629\u0652' },
      { char: '\u0661\u0661', name: '\u0623\u062D\u062F \u0639\u0634\u0631', speech: '\u0623\u064E\u062D\u064E\u062F\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0662', name: '\u0627\u062B\u0646\u0627 \u0639\u0634\u0631', speech: '\u0627\u0650\u062B\u0652\u0646\u064E\u0627 \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0663', name: '\u062B\u0644\u0627\u062B\u0629 \u0639\u0634\u0631', speech: '\u062B\u064E\u0644\u064E\u0627\u062B\u064E\u0629\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0664', name: '\u0623\u0631\u0628\u0639\u0629 \u0639\u0634\u0631', speech: '\u0623\u064E\u0631\u0652\u0628\u064E\u0639\u064E\u0629\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0665', name: '\u062E\u0645\u0633\u0629 \u0639\u0634\u0631', speech: '\u062E\u064E\u0645\u0652\u0633\u064E\u0629\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0666', name: '\u0633\u062A\u0629 \u0639\u0634\u0631', speech: '\u0633\u0650\u062A\u0651\u064E\u0629\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0667', name: '\u0633\u0628\u0639\u0629 \u0639\u0634\u0631', speech: '\u0633\u064E\u0628\u0652\u0639\u064E\u0629\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0668', name: '\u062B\u0645\u0627\u0646\u064A\u0629 \u0639\u0634\u0631', speech: '\u062B\u064E\u0645\u064E\u0627\u0646\u0650\u064A\u064E\u0629\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0661\u0669', name: '\u062A\u0633\u0639\u0629 \u0639\u0634\u0631', speech: '\u062A\u0650\u0633\u0652\u0639\u064E\u0629\u064E \u0639\u064E\u0634\u064E\u0631\u064E' },
      { char: '\u0662\u0660', name: '\u0639\u0634\u0631\u0648\u0646', speech: '\u0639\u0650\u0634\u0652\u0631\u064F\u0648\u0646\u064E' },
    ].map(i => ({ ...i, lang: 'ar-SA' })),
  },
  arabicShapes: {
    title: '\u0627\u0644\u0623\u0634\u0643\u0627\u0644 \u0628\u0627\u0644\u0639\u0631\u0628\u064A',
    color: '#FACC15',
    icon: '\uD83D\uDD36',
    cardClass: 'card-arabic-shapes',
    items: [
      { char: '\u25CF', name: '\u062F\u0627\u0626\u0631\u0629', speech: '\u062F\u064E\u0627\u0626\u0650\u0631\u064E\u0629\u0652', shapeColor: '#60A5FA' },
      { char: '\u25A0', name: '\u0645\u0631\u0628\u0639', speech: '\u0645\u064F\u0631\u064E\u0628\u0651\u064E\u0639\u0652', shapeColor: '#F87171' },
      { char: '\u25B2', name: '\u0645\u062B\u0644\u062B', speech: '\u0645\u064F\u062B\u064E\u0644\u0651\u064E\u062B\u0652', shapeColor: '#4ADE80' },
      { char: '\u2B1F', name: '\u062E\u0645\u0627\u0633\u064A', speech: '\u062E\u064F\u0645\u064E\u0627\u0633\u0650\u064A\u0651', shapeColor: '#FACC15' },
      { char: '\u2B21', name: '\u0633\u062F\u0627\u0633\u064A', speech: '\u0633\u064F\u062F\u064E\u0627\u0633\u0650\u064A\u0651', shapeColor: '#FB923C' },
      { char: '\u2B50', name: '\u0646\u062C\u0645\u0629', speech: '\u0646\u064E\u062C\u0652\u0645\u064E\u0629\u0652', shapeColor: '#FACC15' },
      { char: '\uD83D\uDC8E', name: '\u0645\u0639\u064A\u0646', speech: '\u0645\u064F\u0639\u064E\u064A\u0651\u064E\u0646\u0652', shapeColor: '#C084FC' },
      { char: '\u2665', name: '\u0642\u0644\u0628', speech: '\u0642\u064E\u0644\u0652\u0628\u0652', shapeColor: '#FF6B9D' },
      { char: '\u2B2D', name: '\u0628\u064A\u0636\u0627\u0648\u064A', speech: '\u0628\u064E\u064A\u0652\u0636\u064E\u0627\u0648\u0650\u064A\u0651', shapeColor: '#60A5FA' },
      { char: '\u25AC', name: '\u0645\u0633\u062A\u0637\u064A\u0644', speech: '\u0645\u064F\u0633\u0652\u062A\u064E\u0637\u0650\u064A\u0644\u0652', shapeColor: '#4ADE80' },
    ].map(i => ({ ...i, lang: 'ar-SA' })),
  },
  colors: {
    title: 'Colors',
    color: '#2DD4BF',
    icon: '\uD83C\uDFA8',
    cardClass: 'card-colors',
    items: [
      { char: '\u2B24', name: 'Red', shapeColor: '#EF4444' },
      { char: '\u2B24', name: 'Blue', shapeColor: '#3B82F6' },
      { char: '\u2B24', name: 'Green', shapeColor: '#22C55E' },
      { char: '\u2B24', name: 'Yellow', shapeColor: '#EAB308' },
      { char: '\u2B24', name: 'Orange', shapeColor: '#F97316' },
      { char: '\u2B24', name: 'Purple', shapeColor: '#A855F7' },
      { char: '\u2B24', name: 'Pink', shapeColor: '#EC4899' },
      { char: '\u2B24', name: 'Brown', shapeColor: '#92400E' },
      { char: '\u2B24', name: 'Black', shapeColor: '#1F2937' },
      { char: '\u2B24', name: 'White', shapeColor: '#F9FAFB' },
    ].map(i => ({ ...i, speech: i.name, lang: 'en-US', isColor: true })),
  },
  arabicColors: {
    title: '\u0627\u0644\u0623\u0644\u0648\u0627\u0646',
    color: '#F472B6',
    icon: '\uD83C\uDFA8',
    cardClass: 'card-arabic-colors',
    items: [
      { char: '\u2B24', name: '\u0623\u062D\u0645\u0631', speech: '\u0623\u064E\u062D\u0652\u0645\u064E\u0631\u0652', shapeColor: '#EF4444' },
      { char: '\u2B24', name: '\u0623\u0632\u0631\u0642', speech: '\u0623\u064E\u0632\u0652\u0631\u064E\u0642\u0652', shapeColor: '#3B82F6' },
      { char: '\u2B24', name: '\u0623\u062E\u0636\u0631', speech: '\u0623\u064E\u062E\u0652\u0636\u064E\u0631\u0652', shapeColor: '#22C55E' },
      { char: '\u2B24', name: '\u0623\u0635\u0641\u0631', speech: '\u0623\u064E\u0635\u0652\u0641\u064E\u0631\u0652', shapeColor: '#EAB308' },
      { char: '\u2B24', name: '\u0628\u0631\u062A\u0642\u0627\u0644\u064A', speech: '\u0628\u064F\u0631\u0652\u062A\u064F\u0642\u064E\u0627\u0644\u0650\u064A\u0651', shapeColor: '#F97316' },
      { char: '\u2B24', name: '\u0628\u0646\u0641\u0633\u062C\u064A', speech: '\u0628\u064E\u0646\u064E\u0641\u0652\u0633\u064E\u062C\u0650\u064A\u0651', shapeColor: '#A855F7' },
      { char: '\u2B24', name: '\u0648\u0631\u062F\u064A', speech: '\u0648\u064E\u0631\u0652\u062F\u0650\u064A\u0651', shapeColor: '#EC4899' },
      { char: '\u2B24', name: '\u0628\u0646\u064A', speech: '\u0628\u064F\u0646\u0651\u0650\u064A\u0651', shapeColor: '#92400E' },
      { char: '\u2B24', name: '\u0623\u0633\u0648\u062F', speech: '\u0623\u064E\u0633\u0652\u0648\u064E\u062F\u0652', shapeColor: '#1F2937' },
      { char: '\u2B24', name: '\u0623\u0628\u064A\u0636', speech: '\u0623\u064E\u0628\u0652\u064A\u064E\u0636\u0652', shapeColor: '#F9FAFB' },
    ].map(i => ({ ...i, lang: 'ar-SA', isColor: true })),
  },
};

export const arabicCategories = ['arabic', 'arabicNumbers', 'arabicShapes', 'arabicColors'];
export const shapeCategories = ['shapes', 'arabicShapes'];
export const colorCategories = ['colors', 'arabicColors'];
