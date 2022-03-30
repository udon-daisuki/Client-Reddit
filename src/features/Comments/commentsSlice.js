import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
//   allIds: [1, 2]
// }

const initialState = {
  status: {},
  byId: {},
  allIds: [],
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    removeComments: (comments, action) => {
      const commentIds = action.payload.commentIds
      commentIds.forEach(id => {
        if (comments.byId.hasOwnProperty(id)) {
          delete comments.byId[id]
        }
      })
      comments.allIds = comments.allIds.filter(id => !commentIds.includes(id))
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.pending, (comments, action) => {
        comments.status.isLoading = true
        comments.status.error = { hasError: false, code: '', errMsg: '' }
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
        comments.status.isLoading = false
        comments.status.error = action.payload
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

export const { removeComments } = commentsSlice.actions

export default commentsSlice.reducer