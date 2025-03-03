export interface Package {
  name: string;
  author: { name: string };
  time: { modified: string };
  description: string;
  readme: string;
  version: string;
  keywords: string[];
  links: {
    homepage: string;
    repository: string;
    bugs: string;
    npm: string;
  };
  date: string;
  maintainers: { email: string; username: string }[];
  publisher: { email: string; username: string };
  license: string;
}

export interface PackageEntry {
  package: Package;
  downloads: { monthly: number; weekly: number };
  updated: string;
}

export interface SearchResult {
  objects: PackageEntry[];
  total: number;
}


