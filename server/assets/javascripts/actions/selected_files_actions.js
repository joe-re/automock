/* flow */

import request from 'superagent';
export const GET_SELECTED_FILES = 'GET_SELECTED_FILES';
export const CREATE_SELECTED_FILES = 'CREATE_SELECTED_FILES';
export const DELETE_SELECTED_FILES = 'DELETE_SELECTED_FILES';

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

export function createSelectedFile(name) {
  return (dispatch) => {
    request.
      post('/selected_files').
      send({ name }).
      end((_err, res) => {
        dispatch({
          type: CREATE_SELECTED_FILES,
          selectedFile: res.body
        });
      }
    );
  };
}

export function deleteSelectedFile(id) {
  return (dispatch) => {
    request.
      delete(`/selected_files/${id}`).
      end((_err, _res) => {
        dispatch({ type: DELETE_SELECTED_FILES, id });
      }
    );
  };
}
