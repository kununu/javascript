import {getUrl} from '@kununu/utils/dist';

import {useAppSelector} from './useReduxTypescript';

export default function useFooterMetaData(
  baseUrl: string,
  query: Record<string, unknown>,
  urlParams: string,
): any {
  const {footer} = useAppSelector(({metadata}) => metadata);

  if (!footer?.claim) return null;

  footer.languages.map(item => {
    item.link = getUrl(baseUrl, {...query, 'x-lang': item.locale}, urlParams);
    return item;
  });

  return footer;
}
