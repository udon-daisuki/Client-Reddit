import { Post } from './Post'
import { useSelector } from 'react-redux'
import { selectAllPostsIds } from './postsSlice'

export const Posts = () => {
  const allPostsIds = useSelector(selectAllPostsIds)

  return (
    <>
      {allPostsIds.map(id => (
        <Post id={id} key={id} />
      ))}
    </>
  )
}