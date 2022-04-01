import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { selectAllSubredditIds } from './subredditsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSubreddits } from './subredditsSlice';
import { Subreddit } from './Subreddit';
import { fetchPostsBySubredditId } from '../Posts/postsSlice';

export const Subreddits = () => {
  const ids = useSelector(selectAllSubredditIds)
  const dispatch = useDispatch()
  const [ selectedId, setSelectedId ] = useState('')

  useEffect(() => {
    dispatch(fetchSubreddits())
  }, [dispatch])

  useEffect(() => {
    if (ids.length !== 0) {
      const initialId = ids[0]
      setSelectedId(initialId)
      dispatch(fetchPostsBySubredditId(initialId))
    }
  }, [dispatch, ids])
  
  return (
    <Paper>
      <Typography 
        variant='h4'
        sx={{
          px: 2,
          pt: 2,
          fontWeight: 'bold',
        }}>Subreddits</Typography>
      <List>
        {ids.map(id => {
          return (
            <Subreddit 
              key={id} 
              id={id} 
              selected={id === selectedId} 
              setSelectedId={setSelectedId}
            />
          )
        })}
      </List>
    </Paper>
  )
}