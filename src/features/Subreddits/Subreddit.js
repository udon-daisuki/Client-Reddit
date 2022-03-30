import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsBySubreddit } from '../Posts/postsSlice';
import Typography from '@mui/material/Typography'
import { selectSubredditById } from './subredditsSlice';

export const Subreddit = ({ id, selected, setSelectedId }) => {
  const subreddit = useSelector(selectSubredditById(id))
  const dispatch = useDispatch()

  const onClickHandler = () => {
    setSelectedId(subreddit.id)
    dispatch(fetchPostsBySubreddit(subreddit.url))
  }

  return (
    <ListItem>
      <ListItemButton selected={selected} onClick={onClickHandler}>
        <ListItemAvatar>
          <Avatar alt={subreddit.title} src={subreddit.iconUrl}>
            {subreddit.title[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={
          <Typography sx={{fontWeight: 'bold'}}>{subreddit.title}</Typography>
        }/>
      </ListItemButton>
    </ListItem>
  )
}