/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { selectCommentById } from './commentsSlice'
import { convertToRelativeDate } from '../../utils'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react';

const commentStyle = css`
  pre {
    white-space: pre-wrap; // markdownで<pre>に解釈される箇所で文章の回り込みをさせる
  }

  p {
    margin: 0;
    overflow-wrap: anywhere;
  }
`

export const Comment = ({ id }) => {
  const comment = useSelector(selectCommentById(id))
  const [ elevation, setElevation ] = useState(0)

  return (
    <Paper
      onMouseOver={() => setElevation(3)}
      onMouseLeave={() => setElevation(0)}
      elevation={elevation}
      sx={{
        p: 1,
        px: 2,
        mb: 3,
        color: 'text.secondary',
        backgroundColor: 'secondary.light',
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          my: 1,
        }}>
        <Typography 
          color='primary.main'
          variant='subtitle1'
          sx={{
            flex: 1,
            ml: 3,
            fontWeight: 'bold',
          }}
        >
          {comment.author}
        </Typography>
        <Typography
          sx={{ fontStyle: 'italic' }}
        >
          {convertToRelativeDate(comment.createdAt)}
        </Typography>
      </Box>
      <Box>
        <ReactMarkdown css={commentStyle}>{comment.comment}</ReactMarkdown>
      </Box>
    </Paper>
  )
}