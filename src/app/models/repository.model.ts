import Chroma from '@carlos-dubon/chroma';
import { Mode } from '@carlos-dubon/chroma/lib/models/mode.enum';
import { opacity } from './language.colors';
import { LicenseI } from './license.model';
import { OwnerI } from './user.model';

export interface RepositoryI {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: OwnerI;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: LicenseI;
  forks: number;
  open_issues: number;
  watchers: string;
  default_branch: string;
}

export class LanguageStat {
  name: string;
  quantity: number;
  color: string;
  private chroma: Chroma;
  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
    this.chroma = new Chroma({
      colorMode: Mode.rgb,
      opacity: opacity,
      warnings: false,
    });
    this.color = this.chroma.get(this.name) as string;
  }
}
