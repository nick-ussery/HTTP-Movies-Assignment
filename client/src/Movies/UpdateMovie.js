import React from 'react';


const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
  };
  
  const UpdateMovie = props => {
    const [item, setItem] = useState(initialItem);
  
    const changeHandler = ev => {
      ev.persist();

      setItem({
        ...item,
        [ev.target.name]: value
      });
    };
    const handleSubmit = e => {
      e.preventDefault();

      const newMovie = {
          title: item.title,
          director: item.director,
          metascore: item.metascore,
          stars: item.stars.split(',')
      }
    };
  
    return (
      <div>
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={item.title}
          />
          <div className="baseline" />
  
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="Director"
            value={item.directr}
          />
          <div className="baseline" />
  
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="Metascore"
            value={item.metascore}
          />
          <div className="baseline" />
        <label>Separate stars with a comma</label>
          <input
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder="Stars"
            value={item.stars.toString()}
          />
          <div className="baseline" />
  
          <button className="md-button form-button">Update Movie</button>
        </form>
      </div>
    );
  };

export const UpdateMovie