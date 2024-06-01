import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './ArticleInput.css';
import { addArticle } from '../../store/articleReducer';
import { useDispatch } from 'react-redux';

const ArticleInput = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [newArticle, setNewArticle] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      dispatch(addArticle(newArticle));
      setIsSubmitted(() => false);
    }
  }, [dispatch, isSubmitted, newArticle])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(() => true);
    const newArticle = {
      id: nanoid(),
      title, body, imageUrl
    };

    setNewArticle(() => newArticle)

    reset();
  };

  const reset = () => {
    setTitle('');
    setImageUrl('');
    setBody('');
  };

  return (
    <div className='inputBox'>
      <h1>Create Article</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setTitle(() => e.target.value)}
          value={title}
          placeholder='Title'
          name='title'
        />
        <input
          type='text'
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder='Image URL'
          name='imageUrl'
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name='body'
          placeholder='Add your entry'
          rows='10'
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ArticleInput;
