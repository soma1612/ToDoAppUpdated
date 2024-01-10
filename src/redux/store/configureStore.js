import { createStore } from 'redux';
import taskReducer from '../reducers/taskReducer';

// Create Redux store
const store = createStore(taskReducer);

export default store;