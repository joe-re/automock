import { combineReducers } from 'redux';
import selectedFiles from './selected_files';
import mockFiles from './mock_files';

const rootReducer = combineReducers({ selectedFiles, mockFiles });

export default rootReducer;
