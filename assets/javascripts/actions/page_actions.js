import request from 'superagent';
export const GET_INITIAL_PAGE = 'GET_INITIAL_PAGE';

export function getInitialPage() {
  return (dispatch) => {
    request.
      get('https://www.google.co.jp/').
      end((_err, res) => {
        dispatch({
          type: GET_INITIAL_PAGE,
          page: res
        });
      }
    );
  };
}
