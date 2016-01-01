import { List } from 'immutable';
import { GET_SELECTED_FILES } from '../actions/selected_files_actions';

export default function selectedFiles(state = List(), action) {
  switch (action.type) {
  case GET_SELECTED_FILES:
    return List(action.selectedFiles);
  default:
    return state;
  }
}
