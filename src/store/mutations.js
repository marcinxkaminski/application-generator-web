/* eslint-disable no-param-reassign */
import MutationTypes from '../constants/MutationTypes';
import RequestStatuses from '../constants/RequestStatuses';

export default {
  [MutationTypes.UPDATE_STORE](state, value) {
    state = { ...state, ...value };
  },

  [MutationTypes.UPDATE_PROPERTY](state, { key, value }) {
    state[key] = value;
  },

  [MutationTypes.UPDATE_SYLLABUS_PROPERTY](state, { key, value }) {
    state.syllabus[key] = value;
  },

  [MutationTypes.UPDATE_REQUEST_STATUS](state) {
    if (state.status !== RequestStatuses.LOADING) {
      state.status = RequestStatuses.LOADING;
    }
  },

  [MutationTypes.UPDATE_REQUEST_STATUS_SUCCESS](state) {
    if (state.status !== RequestStatuses.SUCCESS) {
      state.status = RequestStatuses.SUCCESS;
    }
  },

  [MutationTypes.UPDATE_REQUEST_STATUS_FAILURE](state) {
    if (state.status !== RequestStatuses.FAILURE) {
      state.status = RequestStatuses.FAILURE;
    }
  },
};
