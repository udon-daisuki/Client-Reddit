import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCommentsByPostId } from '../Comments/commentsSlice'
import { removeComments } from '../Comments/commentsSlice'

// Slice Shape example
// const initialState = {
//   status: {
//     isLoading: false,
//     error: {
//       hasError: false,
//       code: '',
//       errMsg: '',
//     },
//   },
//   byId: {
//     '1': {
//       id: 1,
//       title: 'hoge fuga',
//       author: 'foo',
//       createdAt: 123456,
//       commentNum: 100,
//       imageUrl: '',
//       commentUrl: '',
//       score: 1000,
//       commentIds: [],
//     }
//   },
//   allIds: [1]
// }

const initialState = {
  status: {},
  byId: {},
  allIds: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    incrementScoreByOne: (posts, action) => {
      const postId = action.payload
      posts.byId[postId].score += 1
    },
    decrementScoreByOne: (posts, action) => {
      const postId = action.payload
      posts.byId[postId].score -= 1
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsBySubreddit.pending, (state, action) => {
        state.status.isLoading = true
        state.status.error = { hasError: false, code: '', errMsg: '' }
        state.byId = {}
        state.allIds = []
      })
      .addCase(fetchPostsBySubreddit.fulfilled, (state, action) => {
        state.status.isLoading = false
        state.status.error = { hasError: false, code: '', errMsg: '' }
        const dataChildren = action.payload.data.children
        dataChildren.forEach(child => {
          const { id, title, author, created_utc, num_comments, permalink, score } = child.data
          const imageUrl = child.data.post_hint === 'image' ? child.data.url : ''
          state.byId[id] = {
            id: id,
            title: title,
            author: author,
            createdAt: created_utc * 1000, // seconds -> milliseconds
            commentsNum: num_comments,
            imageUrl: imageUrl,
            commentsUrl: `${hostName}${permalink}`.slice(0, -1),
            score: score,
            commentIds: [],
          }
          state.allIds.push(id)
        })
      })
      .addCase(fetchPostsBySubreddit.rejected, (state, action) => {
        state.status.isLoading = false
        state.status.error = action.payload
      })
      .addCase(fetchCommentsByPostId.fulfilled, (posts, action) => {
        const postId = action.meta.arg.postId
        const dataChildren = action.payload[1].data.children.slice(0, -1)
        dataChildren.forEach(child => {
          const { id } = child.data
          posts.byId[postId].commentIds.push(id)
        })
      })
      .addCase(removeComments, (posts, action) => {
        const postId = action.payload.postId
        posts.byId[postId].commentIds = []
      })
  }
})

const hostName = 'https://www.reddit.com'

export const fetchPostsBySubreddit = createAsyncThunk(
  'posts/fetchPostsBySubreddit',
  async (subredditUrl, { rejectWithValue }) => {
    try {
      const res = await fetch(`${subredditUrl}.json`)
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
    } catch (err) {
      console.log(err)
    } 
  }
)

// Selector
export const selectAllPostsIds = state => state.posts.allIds
export const selectPostById = id => state => state.posts.byId[id]
export const selectCommentIdsByPostId = id => state => state.posts.byId[id].commentIds

export const { incrementScoreByOne, decrementScoreByOne } = postsSlice.actions

export default postsSlice.reducer