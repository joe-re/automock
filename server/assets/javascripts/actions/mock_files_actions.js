/* flow */

import request from 'superagent';
export const GET_MOCK_FILES = 'GET_MOCK_FILES';

export function getMockFiles() {
  return (dispatch) => {
    request.
      get('./mock_files').
      end((_err, res) => {
        dispatch({
          type: GET_MOCK_FILES,
          mockFiles: res.body
        });
      }
    );
  };
}
