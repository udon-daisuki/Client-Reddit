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

const initialState = {
  isLoading: false,
  error: {
    hasError: false,
    status: '',
    errMsg: '',
  },
  data: {}
}

const hostName = 'https://www.reddit.com'

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubreddits.pending, (state, action) => {
        state.isLoading = true
        state.error = { hasError: false, status: '', errMsg: ''}
        state.data = {}
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = { hasError: false, status: '', errMsg: ''}
        const dataChildren = action.payload.data.children
        dataChildren.forEach(child => {
          const { id, display_name, url, icon_img } = child.data
          state.data[id] = {
            id: id,
            title: display_name,
            url: `${hostName}${url}`,
            iconUrl: icon_img,
          }
        })
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.data = {}
      })
  }
})

export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    const res = await fetch(`${hostName}/subreddits.json`)
    if (res.ok) {
      const resJson = await res.json()
      return resJson
    } else {
      throw new Error({
        hasError: true,
        status: res.status,
        errMsg: res.statusText,
      })
    }
  }
)

// Selector
export const selectSubredditsData = state => state.subreddits.data

export default subredditsSlice.reducer