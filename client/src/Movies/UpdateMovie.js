import React,{useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'


const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
  };
  
  const UpdateMovie = props => {
    const history = useHistory()
    const [item, setItem] = useState(initialItem);
    const [originalMovie, setOriginal] = useState(initialItem)
    const {id} = useParams();
    useEffect(()=>{
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res=>{
      setOriginal(res.data)
      setItem({
        title: res.data.title,
        director:res.data.director,
        metascore:res.data.metascore,
        stars:res.data.stars.toString()
      })

      })
    .catch(err=>{console.log(err)})
    },[id])


    const changeHandler = ev => {
      ev.persist();

      setItem({
        ...item,
        [ev.target.name]: ev.target.value
      });
    };
    const handleSubmit = e => {
      e.preventDefault();
      console.log('stars', item.stars.split(','))
      const newMovie = {
          title: item.title,
          director: item.director,
          metascore: item.metascore,
          stars: item.stars.split(',')
      }

      axios.put(`http://localhost:5000/api/movies/${id}`, newMovie)
      .then(res=>{
        console.log(res)
        props.updateMovieList();
        history.push('/')
      })
    };
  
    return (
      <div>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder={originalMovie.title}
            value={item.title}
          />
          <div className="baseline" />
  
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder={originalMovie.director}
            value={item.director}
          />
          <div className="baseline" />
  
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder={originalMovie.metascore}
            value={item.metascore}
          />
          <div className="baseline" />
        <label>Separate stars with a comma</label>
          <input
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder={'stars'}
            value={item.stars}
          />
          <div className="baseline" />
  
          <button className="md-button form-button">Update Movie</button>
        </form>
      </div>
    );
  };

export default UpdateMovie