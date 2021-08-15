const opacity: number = 0.65;

// Feel free to make a PR for your lang
export const languageColors = {
  JavaScript: `rgba(239,216,29,${opacity})`,
  TypeScript: `rgba(49,120,198,${opacity})`,
  HTML: `rgba(233,98,40,${opacity})`,
  Python: `rgba(52,112,162,${opacity})`,
  Java: `rgba(240,85,41,${opacity})`,
  Go: `rgba(0,167,208,${opacity})`,
  'Jupyter Notebook': `rgba(235,115,37,${opacity})`,
  CSS: `rgba(40,98,233,${opacity})`,
  'Objective-C': `rgba(24,119,221,${opacity})`,
  Elixir: `rgba(99,48,148,${opacity})`,
  Svelte: `rgba(247,58,0,${opacity})`,
  PHP: `rgba(115,119,173,${opacity})`,
  Shell: `rgba(2,216,0,${opacity})`,
  Vue: `rgba(50,71,91,${opacity})`,
  Dart: `rgba(4,86,151,${opacity})`,
  'Vim script': `rgba(1,147,49,${opacity})`,
  TeX: `rgba(0,124,124,${opacity})`,
  'C++': `rgba(97,149,203,${opacity})`,
  C: `rgba(40,52,142,${opacity})`,
  Rust: `rgba(222,53,22,${opacity})`,
  CoffeeScript: `rgba(39,49,74,${opacity})`,
  'C#': `rgba(100,32,117,${opacity})`,
  Scala: `rgba(215,50,34,${opacity})`,
  Julia: `rgba(196,103,222,${opacity})`,
  R: `rgba(29,99,180,${opacity})`,
  Ruby: `rgba(169,18,1,${opacity})`,
  Pascal: `rgba(46,93,157,${opacity})`,
  MATLAB: `rgba(226,107,14,${opacity})`,
  Groovy: `rgba(94,151,182,${opacity})`,
  'Visual Basic': `rgba(24,92,146,${opacity})`,
  Swift: `rgba(243,67,39,${opacity})`,
  PowerShell: `rgba(66,112,195,${opacity})`,
  Kotlin: `rgba(242,134,12,${opacity})`,
  PLpgSQL: `rgba(49,100,140,${opacity})`,
};

export function generateRandomRGBAColor(): string {
  const randomBetween = (min: number, max: number) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return `rgba(${r},${g},${b},${opacity})`;
}
