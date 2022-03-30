import { Post } from './Post'
import { useSelector } from 'react-redux'
import { selectAllPostsIds, selectPostsByTerm } from './postsSlice'

export const Posts = () => {
  const allPostsIds = useSelector(selectAllPostsIds)
  const postIdsByTerm = useSelector(selectPostsByTerm)

  return (
    <>
      {postIdsByTerm.map(id => (
        <Post id={id} key={id} />
      ))}
    </>
  )
}