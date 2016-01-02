import { List } from 'immutable';
import { GET_MOCK_FILES } from '../actions/mock_files_actions';
import { CREATE_SELECTED_FILES } from '../actions/selected_files_actions';

export default function mockFiles(state = List(), action) {
  switch (action.type) {
  case GET_MOCK_FILES:
    return List(action.mockFiles);
  case CREATE_SELECTED_FILES:
    return state.filter((file) => file.name !== action.selectedFile.name);
  default:
    return state;
  }
}
