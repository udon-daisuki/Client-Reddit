import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export const Subreddit = ({ subreddit, selected, setSelectedId }) => {
  return (
    <ListItem>
      <ListItemButton selected={selected} onClick={() => setSelectedId(subreddit.id)}>
        <ListItemAvatar>
          <Avatar alt={subreddit.title} src={subreddit.iconUrl}>
            {subreddit.title[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={subreddit.title} />
      </ListItemButton>
    </ListItem>
  )
}