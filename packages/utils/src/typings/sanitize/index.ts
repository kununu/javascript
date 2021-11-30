// TODO: discuss this rule before release
// eslint-disable-next-line @typescript-eslint/naming-convention
export type sanitizeOptions = {
  allowedAttributes?: {[key: string]: string[]},
  allowedTags?: string[],
  skipHtmlEntities?: boolean,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type defaultSanitizeOptions = {
  allowedTags?: string[],
};
