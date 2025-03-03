export interface PackageDetails {
    name: string;
    'dist-tags': {
      latest: string;
    };
    time: Record<string | 'created' | 'modified', string>;
    bugs: {
      url: string;
    };
    author: {
      name: string;
    };
    license: string;
    homepage: string;
    keywords: string[];
    repository: {
      url: string;
      type: string;
    };
    versions: any;
    description: string;
    maintainers: { email: string; name: string }[];
    readme: string;
    readmeFilename: string;
  }