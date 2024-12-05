import { useState, useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults';

export const useComments = (runupId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`/runups/${runupId}/comments/`);
        setComments(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to fetch comments. Please try again.');
        setLoading(false);
      }
    };

    fetchComments();
  }, [runupId]);

  const addComment = async (content) => {
    try {
      const { data } = await axiosReq.post(`/api/runups/${runupId}/comments/`, { content });
      setComments(prevComments => [data, ...prevComments]);
      return { success: true };
    } catch (err) {
      console.error('Error adding comment:', err);
      return { success: false, message: 'Failed to add comment. Please try again.' };
    }
  };

  const editComment = async (commentId, content) => {
    try {
      const { data } = await axiosReq.put(`/api/comments/${commentId}/edit/`, { content });
      setComments(prevComments => 
        prevComments.map(comment => comment.id === commentId ? data : comment)
      );
      return { success: true };
    } catch (err) {
      console.error('Error editing comment:', err);
      return { success: false, message: 'Failed to edit comment. Please try again.' };
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axiosReq.delete(`/api/comments/${commentId}/delete/`);
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      return { success: true };
    } catch (err) {
      console.error('Error deleting comment:', err);
      return { success: false, message: 'Failed to delete comment. Please try again.' };
    }
  };

  return { comments, loading, error, addComment, editComment, deleteComment };
};