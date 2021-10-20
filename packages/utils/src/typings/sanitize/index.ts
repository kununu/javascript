export type sanitizeOptions = {
  allowedAttributes?: {[key: string]: string[]},
  allowedTags?: string[],
  skipHtmlEntities?: boolean,
};
