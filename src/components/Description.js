import PropTypes from 'prop-types';
import './Description.css';

const Descrtiption = ({ weatherDescription }) => {
  return (
    <div className='description'>
      <h2 className='description-title'>Description:</h2>
      <div className='description-res'>
        {weatherDescription ? (
          <p className='description-text'>{weatherDescription}</p>
        ) : (
          <p className='description-text'>Waiting for location Data</p>
        )}
      </div>
    </div>
  );
};

Descrtiption.defaultProps = {
  weatherDescription: 'Waiting for location data.',
};

Descrtiption.propTypes = {
  weatherDescription: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Descrtiption;
