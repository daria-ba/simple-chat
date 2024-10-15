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
        query: () => ``,
        providesTags: ['Messages'],
      }),
      addMessage: builder.mutation({
        query: (params) => {
          console.log(params);
          return {
            method: 'POST',
            body: params
          }
        },
        invalidatesTags: (result, error, { chatId }) => [{ type: 'Messages', id: chatId }],
      }),
      deleteMessage: builder.mutation({
        query: ({ chatId, messageId }) => ({
          url: `chats/${chatId}/messages/${messageId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, { chatId }) => [{ type: 'Messages', id: chatId }],
      }),
    }),
  });
  

  export const { 
    useGetMessagesQuery, 
    useAddMessageMutation, 
    useDeleteMessageMutation 
  } = messagesApi;
  
  export default messagesApi;