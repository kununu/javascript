import {
  SET_USER_INFO,
  SET_USER_LOGGED_INFO,
  SET_USER_LOGGED_STATUS,
} from '../../actions/user';

const initialStore = {
  id: null,
  image: null,
  isLoggedIn: false,
  isXingUser: false,
  name: null,
  position: null,
  profileName: null,
  userId: null,
  userProfileType: '',
};

type ActionType = {
  type: string;
  payload: {
    data?: Record<string, any>;
    userLoggedInfo?: Record<string, unknown>;
    isLoggedIn?: boolean;
  };
};

export default function userReducer (
  state = initialStore,
  action: ActionType,
): Record<string, unknown> {
  switch (action.type) {
    case SET_USER_LOGGED_INFO: {
      const {isXingUser, userProfileType, userId} =
        action.payload.userLoggedInfo;

      return {
        ...state,
        isXingUser,
        userId,
        userProfileType,
      };
    }

    case SET_USER_LOGGED_STATUS:
      return {
        ...state,
        isLoggedIn: !!action.payload.isLoggedIn,
      };

    case SET_USER_INFO: {
      const [user = {}] = action.payload.data.userProfilesRoles;
      const hasMultipleCompanies =
        action.payload.data.userProfilesRoles.length > 1;

      return {
        ...state,
        id: user.id || null,
        image: user.userImage || null,
        name: user.userName || null,
        position: user.userPosition || null,
        profileName: !hasMultipleCompanies ? user.profileName || null : '',
        userProfilesRoles: action.payload.data.userProfilesRoles,
      };
    }

    default:
      return state;
  }
}
