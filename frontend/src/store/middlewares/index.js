import channelsApi from './channelsApi.js';
import messagesApi from './messagesApi.js';
import authApi from './authApi.js';

export const {
  useLoginUserMutation,
  useSignupMutation,
} = authApi

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
