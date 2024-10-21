import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (params) => {
        return {
          method: 'POST',
          body: params,
        };
      },
      invalidatesTags: ({ channelId }) => [{ type: 'Messages', id: channelId }],
    }),
    deleteMessage: builder.mutation({
      query: ({ channelId, messageId }) => ({
        url: `channels/${channelId}/messages/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ({ channelId }) => [{ type: 'Messages', id: channelId }],
    }),
  }),
});

export const { 
  useGetMessagesQuery, 
  useAddMessageMutation, 
  useDeleteMessageMutation 
} = messagesApi;

export default messagesApi;
