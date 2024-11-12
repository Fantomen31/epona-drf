import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComment, faHeart, faImage } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/ClubProfilePage.module.css'

const ClubGroupFeed = () => {
  const [posts, setPosts] = useState([
    { id: 1, type: 'photo', content: '/placeholder.svg?height=400&width=600&text=Group+Run+Photo', caption: 'Great group run today!', author: 'John Doe', likes: 15, comments: 3, timestamp: '2 hours ago' },
    { id: 2, type: 'discussion', content: 'What\'s everyone\'s favorite post-run snack?', author: 'Jane Smith', likes: 8, comments: 5, timestamp: '5 hours ago' },
    { id: 3, type: 'photo', content: '/placeholder.svg?height=400&width=600&text=New+Running+Shoes', caption: 'Just got my new running shoes!', author: 'Mike Johnson', likes: 20, comments: 7, timestamp: '1 day ago' },
    { id: 4, type: 'discussion', content: 'Tips for preventing runner\'s knee?', author: 'Emily Brown', likes: 12, comments: 6, timestamp: '2 days ago' },
  ])

  const [newPost, setNewPost] = useState({ type: 'discussion', content: '', caption: '' })

  const handlePostSubmit = (e) => {
    e.preventDefault()
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: 'Current User',
      likes: 0,
      comments: 0,
      timestamp: 'Just now'
    }
    setPosts([post, ...posts])
    setNewPost({ type: 'discussion', content: '', caption: '' })
  }

  return (
    <div className={styles.groupFeed}>
      <Form onSubmit={handlePostSubmit} className={styles.postForm}>
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="Start a discussion or add a photo..."
            value={newPost.type === 'discussion' ? newPost.content : newPost.caption}
            onChange={(e) => setNewPost({ ...newPost, [newPost.type === 'discussion' ? 'content' : 'caption']: e.target.value })}
          />
        </Form.Group>
        <div className={styles.postFormActions}>
          <Button
            variant="outline-secondary"
            onClick={() => setNewPost({ ...newPost, type: newPost.type === 'discussion' ? 'photo' : 'discussion' })}
          >
            <FontAwesomeIcon icon={newPost.type === 'discussion' ? faImage : faComment} />
            {newPost.type === 'discussion' ? ' Add Photo' : ' Text Post'}
          </Button>
          {newPost.type === 'photo' && (
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
          )}
          <Button type="submit">Post</Button>
        </div>
      </Form>

      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.postHeader}>
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            <span className={styles.author}>{post.author}</span>
            <span className={styles.timestamp}>{post.timestamp}</span>
          </div>
          {post.type === 'photo' ? (
            <div className={styles.photoPost}>
              <img src={post.content} alt={post.caption} className={styles.postImage} />
              <p>{post.caption}</p>
            </div>
          ) : (
            <p>{post.content}</p>
          )}
          <div className={styles.postActions}>
            <Button variant="link" className={styles.actionButton}>
              <FontAwesomeIcon icon={faHeart} /> {post.likes} Likes
            </Button>
            <Button variant="link" className={styles.actionButton}>
              <FontAwesomeIcon icon={faComment} /> {post.comments} Comments
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClubGroupFeed