import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  currentUser: string
}

const initialState: UserState = { currentUser: '' }

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateCurrentUserData: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload
    },
  },
})

export const { updateCurrentUserData } = userSlice.actions

export default userSlice.reducer
