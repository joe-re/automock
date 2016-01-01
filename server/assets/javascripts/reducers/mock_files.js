/* @flow */

import { List } from 'immutable';
import { GET_MOCK_FILES } from '../actions/mock_files_actions';

type State = List<string>;

export default function mockFiles(state: State = List(), action: any): State {
  switch (action.type) {
  case GET_MOCK_FILES:
    return List(action.mockFiles);
  default:
    return state;
  }
}
