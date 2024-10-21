/* eslint-disable import/no-named-as-default-member */
import channelsApi from './channelsApi.js';
import messagesApi from './messagesApi.js';

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;

export default {
  channelsApi,
  messagesApi,
};
