import React, { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import styles from '../styles/Comments.module.css';

const Comments = ({ runupId }) => {
  const { comments, loading, error, addComment, editComment, deleteComment } = useComments(runupId);
  const currentUser = useCurrentUser();
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const result = await addComment(newComment);
      if (result.success) {
        setNewComment('');
      } else {
        alert(result.message);
      }
    }
  };

  const handleEdit = async (commentId) => {
    if (editContent.trim()) {
      const result = await editComment(commentId, editContent);
      if (result.success) {
        setEditingComment(null);
        setEditContent('');
      } else {
        alert(result.message);
      }
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const result = await deleteComment(commentId);
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className={styles.commentsSection}>
      <h3>Comments</h3>
      <Form onSubmit={handleSubmit} className={styles.commentForm}>
        <Form.Group controlId="newComment">
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
        </Form.Group>
        <Button type="submit" variant="primary" className={styles.submitButton}>
          Post Comment
        </Button>
      </Form>
      <div className={styles.commentsList}>
        {comments.map(comment => (
          <div key={comment.id} className={styles.comment}>
            <p className={styles.commentUser}>{comment.user}</p>
            {editingComment === comment.id ? (
              <Form onSubmit={(e) => { e.preventDefault(); handleEdit(comment.id); }}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <Button type="submit" variant="primary" size="sm">Save</Button>
                <Button variant="secondary" size="sm" onClick={() => setEditingComment(null)}>Cancel</Button>
              </Form>
            ) : (
              <>
                <p className={styles.commentText}>{comment.content}</p>
                <p className={styles.commentTimestamp}>{new Date(comment.created_at).toLocaleString()}</p>
                {currentUser && currentUser.username === comment.user && (
                  <div className={styles.commentActions}>
                    <Button 
                      variant="link" 
                      onClick={() => { setEditingComment(comment.id); setEditContent(comment.content); }}
                    >
                      Edit
                    </Button>
                    <Button variant="link" onClick={() => handleDelete(comment.id)}>Delete</Button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;