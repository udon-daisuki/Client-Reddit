/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostById } from './postsSlice';
import { convertToNumWithUnit, convertToRelativeDate } from '../../utils';
import { Comments } from '../Comments/Comments';
import { useState } from 'react';
import { fetchCommentsByPostId, getCommentIdsToRemove } from '../Comments/commentsSlice';
import { Score } from '../../components/Score';
import Skeleton from '@mui/material/Skeleton';

const imageContainer = css`
  margin: 1rem;
`

const imageStyle = css`
  width: 100%;
  border-radius: 10px;
`

export const Post = ({ id }) => {
  const post = useSelector(selectPostById(id))
  const dispatch = useDispatch()
  const [ commentButtonColor, setCommentButtonColor ] = useState('default')

  const openCommentsHandler = () => {
    if (commentButtonColor === 'default') {
      setCommentButtonColor('primary')
      dispatch(fetchCommentsByPostId({
        postId: id,
        commentsUrl: post.commentsUrl
      }))
    } else {
      setCommentButtonColor('default')
      dispatch(getCommentIdsToRemove(id))
    }
  }

  if (id === 'skeleton') {
    return (
      <Paper
        sx={{
          mb: 2,
          display: 'flex'
        }}
      >
        <Score id={id} />
        <Box
          sx={{
            flex: 1,
            px: 1,
            mx: 1,
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        > 
          <Box
            sx={{
              flex: 1,
              mb: 2,
              minHeight: '50px',
            }}
          >
            <Skeleton variant='rectangular' sx={{
              width: '100%',
              height: '100px',
              borderRadius: '5px',
            }}/>
          </Box>
          <Divider/>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
            }}
          >
            <Skeleton variant='rectangular' sx={{
              width: '20%',
              height: '20px',
              borderRadius: '5px',
            }}/>
            <Skeleton variant='rectangular' sx={{
              width: '20%',
              height: '20px',
              borderRadius: '5px',
            }}/>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton size='small' onClick={openCommentsHandler} color={commentButtonColor}>
                <CommentIcon fontSize='small'/>
              </IconButton>
              <Skeleton variant='rectangular' sx={{
                width: '25px',
                height: '20px',
                borderRadius: '5px',
              }}/>
            </Box>
          </Box>
          <Box>
          
          </Box>
        </Box>
      </Paper>
    )
  } else {
    return (
      <Paper
        sx={{
          mb: 2,
          display: 'flex'
        }}
      >
        <Score id={id} />
        <Box
          sx={{
            flex: 1,
            px: 1,
            mx: 1,
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        > 
          <Box
            sx={{
              flex: 1,
              mb: 2,
              minHeight: '50px',
            }}
          >
            <Typography
              variant='h6'
            >
              {post.title}
            </Typography>
            {post.imageUrl && (
            <div css={imageContainer}>
              <img alt={post.title} src={post.imageUrl} css={imageStyle}/>
            </div>
            )}
          </Box>
          <Divider/>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
            }}
          >
            <Typography
              variant='subtitle2'
              color='primary.main'
              sx={{
                pl: 1,
              }}
            >
              {post.author}
            </Typography>
            <Typography
              variant='body2'
            >{convertToRelativeDate(post.createdAt)}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton size='small' onClick={openCommentsHandler} color={commentButtonColor}>
                <CommentIcon fontSize='small'/>
              </IconButton>
              <Typography
                variant='body2'
              >{convertToNumWithUnit(post.commentsNum)}</Typography>
            </Box>
          </Box>
          <Box>
            <Comments postId={id} />
          </Box>
        </Box>
      </Paper>
    )
  }

  
}