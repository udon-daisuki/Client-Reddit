import { useState } from "react"
import { incrementScoreByOne, decrementScoreByOne, selectScoreByPostId } from "../features/Posts/postsSlice"
import { convertToNumWithUnit } from "../utils"
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton';

export const Score = ({ id }) => {
  const score = useSelector(selectScoreByPostId(id))
  const dispatch = useDispatch()
  const [ scoreColor, setScoreColor ] = useState({
    arrowUpward: 'default',
    arrowDownward: 'default',
    score: 'default.main'
  })

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

  if (id === 'skeleton') {
    return (
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
      <IconButton>
        <ArrowUpwardIcon />
      </IconButton>
      <Skeleton variant="rectangular" sx={{
        width: '25px',
        height: '25px',
        borderRadius: '5px',
      }}/>
      <IconButton>
        <ArrowDownwardIcon />
      </IconButton>
    </Box>
    )
  } else {
    return (
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
        >{convertToNumWithUnit(score)}</Typography>
        <IconButton onClick={toggleDecrementScore} color={scoreColor.arrowDownward}>
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
    )
  }
}