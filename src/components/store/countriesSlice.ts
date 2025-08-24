import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Australia',
  'Japan',
  'China',
  'India',
  'Brazil',
];

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
