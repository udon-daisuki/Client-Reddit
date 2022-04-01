import { Post } from './Post'
import { useSelector } from 'react-redux'
import { selectPostsByTerm } from './postsSlice'

export const Posts = () => {
  const postIdsByTerm = useSelector(selectPostsByTerm)

  return (
    <>
      {postIdsByTerm.map(id => (
        <Post id={id} key={id} />
      ))}
    </>
  )
}