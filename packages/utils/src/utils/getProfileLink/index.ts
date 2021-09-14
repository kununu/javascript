import {isDach} from '../countries';

const baseLink = '/{countryCode}/{slug}';
const links = {
  de: {
    AP_ADD_CULTURE_REVIEW_LINK: '/{countryCode}/insights?forms=kultur&profile={uuid}',
    AP_ADD_REVIEW_LINK: '/{countryCode}/insights?forms=bewerten,gehalt,kultur',
    AP_ADD_REVIEW_LINK_PROFILE: '/{countryCode}/insights?forms=bewerten,gehalt,kultur&profile={uuid}',
    AP_APPLICATION_REVIEWS_EMPTY_REVIEWS_LIST_TEXT_LINK: '/{countryCode}/2/bewerten/bewerbung/{uuid}',
    AP_APPLICATION_REVIEWS_LINK: `${baseLink}/bewerbung`,
    AP_APPLICATION_REVIEWS_PAGE_LINK: `${baseLink}/bewerbung/{page}`,
    AP_CULTURE_LINK: `${baseLink}/kultur`,
    AP_EDIT_PROFILE_LINK: '/{countryCode}/set/profile/id/{uuid}',
    AP_JOBS_LINK: '/{countryCode}/{slug}/jobs',
    AP_NEWS_LINK: '/{countryCode}/{slug}/news',
    AP_QA_LINK: '/{countryCode}/{slug}/fragen-antworten',
    AP_REVIEWS_LINK: `${baseLink}/kommentare`,
    AP_REVIEWS_PAGE_LINK: `${baseLink}/kommentare/{page}`,
    AP_SALARY_JOB_TITLE_DETAIL_LINK: `${baseLink}/gehalt/{jobTitleSlugAndId}`,
    AP_SALARY_JOB_TITLE_OVERVIEW_LINK: `${baseLink}/gehalt`,
    AP_SALARY_LINK: `${baseLink}/gehalt`,
    AP_SINGLE_REVIEW_LINK: `${baseLink}/bewertung/{reviewUuid}`,
    AP_SITE_HEADER_EXTENDED_SEARCH_FULL_LINK: '/{countryCode}/search#/?q={value}&country={country}',
    AP_SITE_HEADER_SUGGESTION_LINK: `${baseLink}`,
    AP_SUMMARY_LINK: `${baseLink}`,
    SALARY_SHARE_LINK: '/{countryCode}/insights?forms=gehalt',
    SALARY_SHARE_PREFILLED_LINK: '/{countryCode}/insights?forms=gehalt&profile={uuid}&formValues[jobTitle][id]={jobRoleId}&formValues[jobTitle][displayTitle]={jobRoleTitle}',
  },
  us: {
    AP_ADD_CULTURE_REVIEW_LINK: '/{countryCode}/insights?forms=kultur&profile={profileUuid}',
    AP_ADD_REVIEW_LINK: '/{countryCode}/insights?forms=bewerten,gehalt,kultur',
    AP_ADD_REVIEW_LINK_PROFILE: '/{countryCode}/insights?forms=bewerten,gehalt,kultur&profile={uuid}',
    AP_APPLICATION_REVIEWS_EMPTY_REVIEWS_LIST_TEXT_LINK: '/{countryCode}/2/review/application/{uuid}',
    AP_APPLICATION_REVIEWS_LINK: `${baseLink}/application-reviews`,
    AP_APPLICATION_REVIEWS_PAGE_LINK: `${baseLink}/application-reviews/{page}`,
    AP_CULTURE_LINK: `${baseLink}/culture`,
    AP_EDIT_PROFILE_LINK: '/{countryCode}/set/profile/id/{uuid}',
    AP_JOBS_LINK: '/{countryCode}/{slug}/jobs',
    AP_NEWS_LINK: '/{countryCode}/{slug}/news',
    AP_QA_LINK: '/{countryCode}/{slug}/questions-answers',
    AP_REVIEWS_LINK: `${baseLink}/reviews`,
    AP_REVIEWS_PAGE_LINK: `${baseLink}/reviews/{page}`,
    AP_SALARY_JOB_TITLE_DETAIL_LINK: `${baseLink}/salary/{jobTitleSlugAndId}`,
    AP_SALARY_JOB_TITLE_OVERVIEW_LINK: `${baseLink}/salary`,
    AP_SALARY_LINK: `${baseLink}/salary`,
    AP_SINGLE_REVIEW_LINK: `${baseLink}/review/{reviewUuid}`,
    AP_SITE_HEADER_EXTENDED_SEARCH_FULL_LINK: '/{countryCode}/search#/?q={value}&country={country}',
    AP_SITE_HEADER_SUGGESTION_LINK: `${baseLink}`,
    AP_SUMMARY_LINK: `${baseLink}`,
    SALARY_SHARE_LINK: '/{countryCode}/insights?forms=salary',
    SALARY_SHARE_PREFILLED_LINK: '/{countryCode}/insights?forms=salary&profile={uuid}&formValues[jobTitle][id]={jobRoleId}&formValues[jobTitle][displayTitle]={jobRoleTitle}',
  },
};

/**
 * Replaces custom params in each link
 *
 * @param {string} link
 * @param {Object} params
 * @param {string} publicFqdn
 */
const getProfileLink = ({
  link,
  params,
  publicFqdn,
}:{
  link: string;
  params: Record<string, string>;
  publicFqdn?: string;
}): string => {
  const {countryCode = 'de'} = params;
  const parsedCountry = isDach(countryCode) ? 'de' : countryCode;
  const profileLink = `${publicFqdn || ''}${links[parsedCountry][link]}`;

  return Object.keys(params).reduce((acc, param) => acc.replace(new RegExp(`{${param}}`, 'g'), params[param] || ''), profileLink);
};

export default getProfileLink;
