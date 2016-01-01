import { List } from 'immutable';
import { GET_MOCK_FILES } from '../actions/mock_files_actions';

export default function mockFiles(state = List(), action) {
  switch (action.type) {
  case GET_MOCK_FILES:
    return List(action.mockFiles);
  default:
    return state;
  }
}
