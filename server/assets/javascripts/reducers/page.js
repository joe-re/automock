/* @flow */

import { List } from 'immutable';
import { GET_INITIAL_PAGE } from '../actions/page_actions';

type State = List<Object>;

export default function page(state: State = List(), action: any): State {
  switch (action.type) {
  case GET_INITIAL_PAGE:
    return List(action.page);
  default:
    return state;
  }
}
