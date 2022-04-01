import { Comment } from "./Comment"
import { useSelector } from 'react-redux'
import { selectCommentIdsByPostId } from "../Posts/postsSlice"
import Skeleton from '@mui/material/Skeleton';
import { selectCommentIsLoading, selectPostIdsLoadingComment } from "./commentsSlice";

export const Comments = ({ postId }) => {
  const allCommentsIds = useSelector(selectCommentIdsByPostId(postId))
  const commentIsLoading = useSelector(selectCommentIsLoading)
  const postIdsLoadingComment = useSelector(selectPostIdsLoadingComment)

  return (
    <>
      {(postIdsLoadingComment[postIdsLoadingComment.length - 1] === postId && commentIsLoading) ? (
        <>
          <Skeleton variant="rectangular" sx={{mb: 1, borderRadius: '5px'}}/>
          <Skeleton variant="rectangular" sx={{mb: 1, borderRadius: '5px'}}/>
          <Skeleton variant="rectangular" sx={{mb: 1, borderRadius: '5px'}}/>
        </>
      ) : 
        allCommentsIds.map(id => (
          <Comment id={id} postId={postId} key={id} />
        ))}
    </>
  )
}