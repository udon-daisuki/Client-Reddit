import { Comment } from "./Comment"
import { useSelector } from 'react-redux'
import { selectCommentIdsByPostId } from "../Posts/postsSlice"

export const Comments = ({ postId }) => {
  const allCommentsIds = useSelector(selectCommentIdsByPostId(postId))

  return (
    <>
      {allCommentsIds.map(id => (
        <Comment id={id} postId={postId} key={id} />
      ))}
    </>
  )
}