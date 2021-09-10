import {
  REQUEST_SEARCH_PROFILES,
  SUCCESS_SEARCH_PROFILES,
  FAILURE_SEARCH_PROFILES,
} from 'actions/searchProfiles';

const initialState = {
  err: null,
  fetchingSearchProfiles: false,
  noResultsFound: false,
  profiles: [],
};

export default function searchProfilesReducer (
  state = initialState,
  action: {type: string; data?: Array<unknown>; err?: unknown},
): Record<string, unknown> {
  switch (action.type) {
    case REQUEST_SEARCH_PROFILES:
      return {
        ...state,
        err: null,
        fetchingSearchProfiles: true,
      };

    case SUCCESS_SEARCH_PROFILES:
      return {
        ...state,
        err: null,
        fetchingSearchProfiles: false,
        noResultsFound: action.data.length === 0,
        profiles: action.data.map(
          ({name, slug, location: {countryCode = undefined, city = ''} = {}}) => ({
            city: city && city.toLowerCase() !== 'all' ? city : '',
            countryCode,
            name,
            slug,
          }),
        ),
      };

    case FAILURE_SEARCH_PROFILES:
      return {
        ...state,
        err: action.err,
        fetchingSearchProfiles: false,
        noResultsFound: true,
      };

    default:
      return state;
  }
}
