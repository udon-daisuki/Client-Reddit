/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByTerm } from '../features/Posts/postsSlice';

const formStyle = css`
  width: 100%;
`

export const SearchBar = () => {
  const [ searchTerm, setSearchTerm ] = useState('')
  const dispatch = useDispatch()

  const handleSearchTermSubmit = e => {
    e.preventDefault()
    dispatch(searchByTerm(searchTerm))
  }

  return (
    <form onSubmit={handleSearchTermSubmit} css={formStyle}>
      <Box
        width='100%' 
        sx={(theme) => ({
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: '5px',
        transition: theme.transitions.create('background-color', {
          duration: 250,
        }), 
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
      })}>
        <InputBase 
          startAdornment={(
            <InputAdornment position='start'>
              <SearchIcon 
                sx={(theme) => ({
                  color: theme.palette.common.white,
                })}/>
            </InputAdornment>
          )}
          placeholder='Search'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={(theme) => ({
          color: theme.palette.common.white,
          padding: '5px',
          width: '100%',
        })}/>
      </Box>
    </form>
  )
}