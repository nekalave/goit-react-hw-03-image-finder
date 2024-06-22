const Filter = ({ filter, handleChange }) => (
  <label>
    Find contacts by name
    <input type="text" name='filter' value={filter} onChange={handleChange} />
  </label>
);

export default Filter;
