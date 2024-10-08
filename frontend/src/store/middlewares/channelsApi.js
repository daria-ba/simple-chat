import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
    reducerPath: 'channelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1',
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
              query: () => 'channels',
              providesTags: ['Channels'],
            }),
        addChat: builder.mutation({
            query: (newChat) => ({
                url: 'channels',
                method: 'POST',
                body: newChat,
            }),
        invalidatesTags: ['Channels'],
        }),
        editChannel: builder.mutation({
            query: (chatId) => ({
              url: `channels/${chatId}`,
              method: 'PATCH',
              body: chatId,
            }),
            invalidatesTags: ['Channels'],
          }),
        deleteChat: builder.mutation({
        query: (chatId) => ({
            url: `channels/${chatId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Chats'],
        }),
    })
})

// export const { useGetChannelsQuery, useAddChatMutation, useDeleteChatMutation } = channelsApi;
export default channelsApi;