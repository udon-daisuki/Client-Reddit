import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostsBySubredditId } from "../Posts/postsSlice";

// initial state example

// state example
// const state = {
//   status: {
//     isLoading: false,
//     code: 0,
//     error: {
//       hasError: false,
//       errMsg: '',
//     }
//   },
//   byId: {
//     '1': {
//       id: '1',
//       author: '',
//       createdAt: 0,
//       comment: '',
//     },
//     '2': {
//       id: '2',
//       author: '',
//       createdAt: 0,
//       comment: '',
//     },
//   },
//   allIds: [1, 2],
//   postIdsLoadingComment: [1],
// }

const initialState = {
  status: {},
  byId: {},
  allIds: [],
  postIdsLoadingComment: [],
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    removeComments: (comments, action) => {
      const { postId, commentIds } = action.payload
      commentIds.forEach(id => {
        if (comments.byId.hasOwnProperty(id)) {
          delete comments.byId[id]
        }
      })
      comments.allIds = comments.allIds.filter(id => !commentIds.includes(id))
      comments.postIdsLoadingComment = comments.postIdsLoadingComment.filter(id => id !== postId)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.pending, (comments, action) => {
        const postId = action.meta.arg.postId
        comments.status.isLoading = true
        comments.status.error = { hasError: false, code: '', errMsg: '' }
        comments.postIdsLoadingComment.push(postId)
      })
      .addCase(fetchCommentsByPostId.fulfilled, (comments, action) => {
        comments.status.isLoading = false
        comments.status.error = { hasError: false, code: '', errMsg: '' }
        const dataChildren = action.payload[1].data.children.slice(0, -1)
        dataChildren.forEach(child => {
          const { id, author, created_utc, body } = child.data
          comments.byId[id] = {
            id: id,
            author: author,
            createdAt: created_utc * 1000, // seconds -> milliseconds
            comment: body
          }
          comments.allIds.push(id)
        })
      })
      .addCase(fetchCommentsByPostId.rejected, (comments, action) => {
        const postId = action.meta.arg.postId
        comments.status.isLoading = false
        comments.status.error = action.payload
        comments.postIdsLoadingComment = comments.postIdsLoadingComment.filter(id => id !== postId)
      })
      .addCase(fetchPostsBySubredditId.fulfilled, (comments, action) => {
        comments.status = {}
        comments.byId = {}
        comments.allIds = []
        comments.postIdsLoadingComment = []
      })
  }
})

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async({ postId, commentsUrl}, { rejectWithValue }) => {
    try {
      const res = await fetch(`${commentsUrl}.json`)
      if (res.ok) {
        const resJson = await res.json()
        return resJson
      } else {
        return rejectWithValue({
          hasError: true,
          code: res.status,
          errMsg: res.statusText,
        })
      }
    } catch(err) {
      console.log(err)
    }
  }
)

export const getCommentIdsToRemove = postId => {
  return (dispatch, getState) => {
    const state = getState()
    const commentIds = state.posts.byId[postId].commentIds
    dispatch(removeComments({
      postId: postId,
      commentIds: commentIds,
    }))
  }
}

// Selector
export const selectCommentById = id => state => state.comments.byId[id]
export const selectCommentIsLoading = state => state.comments.status.isLoading
export const selectPostIdsLoadingComment = state => state.comments.postIdsLoadingComment

export const { removeComments } = commentsSlice.actions

export default commentsSlice.reducer