import { Post } from './Post'
import { useSelector } from 'react-redux'
import { selectPostsByTerm, selectPostsIsLoading } from './postsSlice'

export const Posts = () => {
  const postIdsByTerm = useSelector(selectPostsByTerm)
  const postsIsLoading = useSelector(selectPostsIsLoading)

  return (
    <>
      { postsIsLoading ? (
        ['skeleton', 'skeleton', 'skeleton'].map((id, index) => (
          <Post id={id} key={index} />
        ))
      ) : (
        postIdsByTerm.map(id => (
          <Post id={id} key={id} />
        )))
      }
    </>
  )
}