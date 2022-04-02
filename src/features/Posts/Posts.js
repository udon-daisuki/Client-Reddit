import { Post } from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { selectPostsByTerm, selectPostsIsLoading, selectSearchTerm } from './postsSlice'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { searchByTerm } from './postsSlice';

export const Posts = () => {
  const dispatch = useDispatch()
  const postIdsByTerm = useSelector(selectPostsByTerm)
  const postsIsLoading = useSelector(selectPostsIsLoading)
  const searchTerm = useSelector(selectSearchTerm)

  if (postsIsLoading) {
    return (
      ['skeleton', 'skeleton', 'skeleton'].map((id, index) => (
        <Post id={id} key={index} />
      ))
  )} else if (postIdsByTerm.length === 0 && searchTerm) {
    return (
      <Box textAlign='center'>
        <Typography
          variant='h4'
          color='text.secondary'
          sx={{my: 3}}
        >
          No posts matching "{searchTerm}"
        </Typography>
        <Button 
          variant='contained' 
          size='large' 
          align='center'
          onClick={() => dispatch(searchByTerm(''))}
        >
          Go Home
        </Button>
      </Box>
    )
  } else {
    return (
      postIdsByTerm.map(id => (
        <Post id={id} key={id} />
      ))
    )
  }
}