import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Slice Shape example
// const initialState = {
//   isLoading: false,
//   error: {
//     hasError: false,
//     errMsg: '',
//   },
//   data: {
//     '1': {
//       id: '1',
//       title: 'Home',
//       url: '/r/Home/',
//       iconUrl: '',
//     },
//   }
// }

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
//       id: '1',
//       title: 'Home',
//       url: '/r/Home/',
//       iconUrl: '',
//     },
//   },
//   allIds: [],
// }

const initialState = {
  status: {},
  byId: {},
  allIds: [],
}

const hostName = 'https://www.reddit.com'

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubreddits.pending, (state, action) => {
        state.status.isLoading = true
        state.status.error = { hasError: false, code: '', errMsg: ''}
        state.byId = {}
        state.allIds = []
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status.isLoading = false
        state.status.error = { hasError: false, code: '', errMsg: ''}
        const dataChildren = action.payload.data.children
        dataChildren.forEach(child => {
          const { id, display_name, url, icon_img } = child.data
          state.byId[id] = {
            id: id,
            title: display_name,
            url: `${hostName}${url}`.slice(0, -1),
            iconUrl: icon_img,
          }
          state.allIds.push(id)
        })
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status.isLoading = false
        state.status.error = action.payload
      })
  }
})

export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${hostName}/subreddits.json`)
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

// Selector
export const selectSubredditsData = state => state.subreddits.byId
export const selectAllSubredditIds = state => state.subreddits.allIds
export const selectSubredditById = id => state => state.subreddits.byId[id]

export default subredditsSlice.reducer