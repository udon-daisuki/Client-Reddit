/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostById } from './postsSlice';
import { convertToNumWithUnit, convertToRelativeDate } from '../../utils';
import { Comments } from '../Comments/Comments';
import { useState } from 'react';
import { fetchCommentsByPostId, getCommentIdsToRemove } from '../Comments/commentsSlice';
import { incrementScoreByOne, decrementScoreByOne } from './postsSlice';

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
  const [ scoreColor, setScoreColor ] = useState({
    arrowUpward: 'default',
    arrowDownward: 'default',
    score: 'default.main'
  })

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

  const toggleIncrementScore = () => {
    if (scoreColor.arrowUpward === 'default' && scoreColor.arrowDownward === 'default') {
      setScoreColor(prev => {
        return {
          ...prev,
          arrowUpward: 'success',
          score: 'success.main',
        }
      })
      dispatch(incrementScoreByOne(id))
    } else if(scoreColor.arrowUpward === 'success' && scoreColor.arrowDownward === 'default') {
      setScoreColor(prev => {
        return {
          ...prev,
          arrowUpward: 'default',
          score: 'default.main',
        }
      })
      dispatch(decrementScoreByOne(id))
    } else if(scoreColor.arrowUpward === 'default' && scoreColor.arrowDownward === 'error') {
      setScoreColor({
        arrowUpward: 'success',
        arrowDownward: 'default',
        score: 'success.main',
      })
      dispatch(incrementScoreByOne(id))
      dispatch(incrementScoreByOne(id))
    }
  }

  const toggleDecrementScore = () => {
    if (scoreColor.arrowDownward === 'default' && scoreColor.arrowUpward === 'default') {
      setScoreColor(prev => {
        return {
          ...prev,
          arrowDownward: 'error',
          score: 'error.main',
        }
      })
      dispatch(decrementScoreByOne(id))
    } else if(scoreColor.arrowDownward === 'error' && scoreColor.arrowUpward === 'default') {
      setScoreColor(prev => {
        return {
          ...prev,
          arrowDownward: 'default',
          score: 'default.main',
        }
      })
      dispatch(incrementScoreByOne(id))
    } else if(scoreColor.arrowDownward === 'default' && scoreColor.arrowUpward === 'success') {
      setScoreColor({
        arrowUpward: 'default',
        arrowDownward: 'error',
        score: 'error.main'
      })
      dispatch(decrementScoreByOne(id))
      dispatch(decrementScoreByOne(id))
    } 
  }

  return (
    <Paper
      sx={{
        mb: 2,
        display: 'flex'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          width: '50px',
          fontWeight: 'bold',
          color: 'text.secondary',
          ml: 2,
          mt: 2,
        }}
      >
        <IconButton onClick={toggleIncrementScore} color={scoreColor.arrowUpward}>
          <ArrowUpwardIcon />
        </IconButton>
        <Typography
          color={scoreColor.score}
          sx={{
            fontWeight: 'bold',
          }}
        >{convertToNumWithUnit(post.score)}</Typography>
        <IconButton onClick={toggleDecrementScore} color={scoreColor.arrowDownward}>
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
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