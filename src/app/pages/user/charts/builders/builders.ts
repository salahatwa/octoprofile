import {
  LanguageStat,
  RepositoryI,
} from 'src/app/models/repository.model';
import Chroma from '@carlos-dubon/chroma';
import { Mode } from '@carlos-dubon/chroma/lib/models/mode.enum';
import { opacity } from 'src/app/models/language.colors';

export function buildTopLanguagesChart(
  repos: RepositoryI[]
): [string[], number[], string[]] {
  // Get only a languages array
  let languages: string[] = [];

  repos.forEach((repo: RepositoryI) => {
    // If the repo is not a fork
    if (!repo.fork) languages.push(repo.language);
  });

  // List containing all the languages the user uses
  let uniq: string[] = [...new Set(languages)];
  // Remove null elements from the list
  uniq = uniq.filter((s: string) => s);

  let instances: number[] = [];
  uniq.forEach((language: string) => {
    let count: number = 0;
    count = languages.filter((lang) => lang == language).length;

    instances.push(count);
  });

  let languageStats: LanguageStat[] = [];

  // Create objects for further sorting
  uniq.forEach((lang, index: number) => {
    languageStats.push(new LanguageStat(lang, instances[index]));
  });

  // Sort by quantity and stay with the top 10
  languageStats = languageStats
    .sort((a: LanguageStat, b: LanguageStat) =>
      a.quantity < b.quantity ? 1 : -1
    )
    .slice(0, 10);

  // Clear the arrays
  uniq = [];
  instances = [];
  let colors: string[] = [];

  // Build the arrays to be returned
  languageStats.forEach((langStat: LanguageStat) => {
    uniq.push(langStat.name);
    instances.push(langStat.quantity);
    colors.push(langStat.color);
  });

  return [uniq, instances, colors];
}

export function buildMostStarredRepositoriesChart(
  repos: RepositoryI[]
): [string[], number[]] {
  // Getting the actual repos (no forks)
  let repositories: RepositoryI[] = [];
  repos.forEach((r: RepositoryI) => {
    if (!r.fork) repositories.push(r);
  });

  // Get the top 5 repos with most stars
  repositories = repositories
    .sort((a: RepositoryI, b: RepositoryI) =>
      a.stargazers_count < b.stargazers_count ? 1 : -1
    )
    .slice(0, 5)
    .filter((r) => r.stargazers_count > 0); // Limit to 5 repos and remove the those with no stargazers

  let labels: string[] = [];
  let stars: number[] = [];
  repositories.forEach((r: RepositoryI) => {
    labels.push(r.name);
    stars.push(r.stargazers_count);
  });

  return [labels, stars];
}

export function buildStarsPerLanguageChart(
  repos: RepositoryI[]
): [string[], number[], string[]] {
  // Get only a languages array
  let languages: string[] = [];

  repos.forEach((repo: RepositoryI) => {
    // If the repo is not a fork
    if (!repo.fork) languages.push(repo.language);
  });

  // List containing all the languages the user uses
  let uniq: string[] = [...new Set(languages)];
  // Remove null elements from the list
  uniq = uniq.filter((s: string) => s);

  let starsPerLanguage = [];

  uniq.forEach((lang: string) => {
    let counter: number = 0;
    repos.forEach((repo: RepositoryI) => {
      if (repo.language == lang) counter += repo.stargazers_count;
    });
    starsPerLanguage.push({
      languageName: lang,
      stargazers: counter,
    });
  });

  starsPerLanguage = starsPerLanguage
    .sort((a, b) => (a.stargazers < b.stargazers ? 1 : -1))
    .slice(0, 10); // Sort by number of stargazers and keep a max of 10

  let labels: string[] = [];
  let stargazers: number[] = [];
  let colors: string[] = [];

  const chroma: Chroma = new Chroma({
    opacity: opacity,
    colorMode: Mode.rgb,
    warnings: false,
  });

  starsPerLanguage.forEach((langData) => {
    labels.push(langData.languageName);
    stargazers.push(langData.stargazers);
    colors.push(chroma.get(langData.languageName) as string);
  });

  return [labels, stargazers, colors];
}
