import {RECEIVE_META} from 'actions/metadata';

export default function metadata (
  state = {},
  action: {type?: string; payload?: {data: Record<string, unknown>}} = {},
): Record<string, unknown> {
  switch (action.type) {
    case RECEIVE_META:
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      return state;
  }
}
