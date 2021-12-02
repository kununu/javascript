export type SanitizeOptions = {
  allowedAttributes?: {[key: string]: string[]},
  allowedTags?: string[],
  skipHtmlEntities?: boolean,
};

export type DefaultSanitizeOptions = {
  allowedTags?: string[],
};
