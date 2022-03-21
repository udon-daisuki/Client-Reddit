import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { selectSubredditsData } from './subredditsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSubreddits } from './subredditsSlice';
import { Subreddit } from './Subreddit';

export const Subreddits = () => {
  const subreddits = useSelector(selectSubredditsData)
  const dispatch = useDispatch()
  const [ selectedId, setSelectedId ] = useState('')

  useEffect(() => {
    dispatch(fetchSubreddits())
  }, [dispatch])
  
  useEffect(() => {
    const initialId = Object.keys(subreddits)[0]
    setSelectedId(initialId)
  }, [setSelectedId, subreddits])

  return (
    <Paper>
      <Typography 
        variant='h4'
        sx={{
          px: 2,
          pt: 2,
        }}>Subreddits</Typography>
      <List>
        {Object.keys(subreddits).map(id => {
          return (
            <Subreddit 
              key={id} 
              subreddit={subreddits[id]} 
              selected={id === selectedId} 
              setSelectedId={setSelectedId}
            />
          )
        })}
      </List>
    </Paper>
  )
}