/* flow */

import request from 'superagent';
export const GET_SELECTED_FILES = 'GET_SELECTED_FILES';

export function getSelectedFiles() {
  return (dispatch) => {
    request.
      get('/selected_files').
      end((_err, res) => {
        dispatch({
          type: GET_SELECTED_FILES,
          selectedFiles: res.body
        });
      }
    );
  };
}
