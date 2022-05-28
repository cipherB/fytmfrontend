import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { testApi } from '../apiUrls';

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders: (headers, { getState }) => {
      const {userData: {access_token}} = getState();
      headers.set("Authorization", access_token ? `Bearer ${access_token}` : "")
      return headers
    }
  }),
  tagTypes: ['Board', 'Card', 'Checklist', 'ActivityLog', 'Comment'],
  endpoints: (builder) => ({
    users: builder.query({
      query: () => 'users/'
    }),
    user: builder.query({
      query: (email) => `users/${email}/`
    }),
    login: builder.mutation({
      query: formData => ({
        url: 'token/',
        method: 'POST',
        body: formData
      })
    }),
    register: builder.mutation({
      query: formData => ({
        url: `users/register/`,
        method: 'POST',
        body: formData
      })
    }),
    addWorkspace: builder.mutation({
      query: formData => ({
        url: 'workspace/create/',
        method: 'POST',
        body: formData
      })
    }),
    workspace: builder.query({
      query: (user) => `workspace/${user}/`
    }),
    boards: builder.query({
      query: () => 'board/',
      providesTags: ['Board'],
    }),
    board: builder.query({
      query: (id) => `board/${id}/`,
      providesTags: ['Board'],
    }),
    addBoard: builder.mutation({
      query: formData => ({
        url: 'board/create/',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Board'],
    }),
    updateBoard: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `board/${id}/`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ['Board'],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `board/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
    cards: builder.query({
      query: () => 'card/',
      providesTags: ['Card'],
    }),
    card: builder.query({
      query: (id) => `card/${id}/`,
      providesTags: ['Card'],
    }),
    addCard: builder.mutation({
      query: formData => ({
        url: 'card/create/',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Card'],
    }),
    updateCard: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `card/${id}/`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ['Card'],
    }),
    deleteCard: builder.mutation({
      query: id => ({
        url: `card/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Card'],
    }),
    createActivity: builder.mutation({
      query: (formData) => ({
        url: 'activitylog/create/',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['ActivityLog'],
    }),
    allActivities: builder.query({
      query: () => 'activitylog/',
      providesTags: ['ActivityLog'],
    }),
    workspaceActivities: builder.query({
      query: () => 'activitylog/workspace/',
      providesTags: ['ActivityLog'],
    }),
    boardActivities: builder.query({
      query: () => 'activitylog/board/',
      providesTags: ['ActivityLog'],
    }),
    cardActivities: builder.query({
      query: () => 'activitylog/card/',
      providesTags: ['ActivityLog'],
    }),
    checklists: builder.query({
      query: () => "card/checklists/",
      providesTags: ['Checklist'],
    }),
    updateChecklist: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `card/update-checklist/${id}/`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ['Checklist'],
    }),
    addChecklist: builder.mutation({
      query: formData => ({
        url: "card/create-checklist/",
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["Checklist"], 
    }),
    boardChart: builder.query({
      query: (id) => `board/${id}/chart`,
      providesTags: ['Checklist', 'Card']
    }),
    addComment: builder.mutation({
      query: formData => ({
        url: "card/create-comment/",
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["Comment"], 
    }),
    comments: builder.query({
      query: () => 'card/comments/',
      providesTags: ['Comment'],
    })
  })
})

export const { 
  useUsersQuery, 
  useUserQuery, 
  useLoginMutation,
  useRegisterMutation,
  useAddWorkspaceMutation, 
  useWorkspaceQuery,
  useBoardsQuery,
  useBoardQuery,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useAddBoardMutation,
  useCardsQuery,
  useCardQuery,
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useCreateActivityMutation,
  useAllActivitiesQuery,
  useWorkspaceActivitiesQuery,
  useBoardActivitiesQuery,
  useCardActivitiesQuery,
  useChecklistsQuery,
  useUpdateChecklistMutation,
  useAddChecklistMutation,
  useBoardChartQuery, 
  useCommentsQuery,
  useAddCommentMutation,
} = api;
