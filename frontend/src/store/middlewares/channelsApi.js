import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
    tagTypes: ['Channels'],
    endpoints: (builder) => ({
      getChannels: builder.query({
          query: () => '',
          providesTags: ['Channels'],
        }),
    addChannel: builder.mutation({
        query: (newChannel) => ({
            method: 'POST',
            body: newChannel,
        }),
    invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
        query: (channel) => ({
          url: channel.id,
          method: 'PATCH',
          body: channel,
        }),
        invalidatesTags: ['Channels'],
      }),
    deleteChannel: builder.mutation({
    query: (id) => ({
        url: id,
        method: 'DELETE',
    }),
    invalidatesTags: ['Channels'],
    }),
  }),
});

export default channelsApi;
