import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CommentIcon from '@mui/icons-material/Comment';

export const Post = () => {
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
          width: '50px'
        }}
      >
        <IconButton>
          <ArrowUpwardIcon />
        </IconButton>
        0
        <IconButton>
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
        }}
      > 
        <Box
          minHeight={200}>
          <Typography>Hello World</Typography>
        </Box>
        
        
        <Divider/>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>User Name</Typography>
          <Typography>1 day ago</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton>
              <CommentIcon />
            </IconButton>
            <Typography>100</Typography>
          </Box>
          
        </Box>
      </Box>
    </Paper>
  )
}