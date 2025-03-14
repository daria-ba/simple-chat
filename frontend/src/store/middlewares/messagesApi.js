import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const messagesApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (channel_id) => `messages/${channel_id}`,
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (params) => ({
        url: 'messages',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Messages'],
      // invalidatesTags: ({ channelId }) => [{ type: 'Messages', id: channelId }],
    }),
    removeMessage: builder.mutation({
      query: ({ messageId, userId }) => ({
        url: `messages/${messageId}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export default messagesApi;
