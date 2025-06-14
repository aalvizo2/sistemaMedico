import './Dashboard.css';

const MultiCircleSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner-circles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`circle circle-${i + 1}`} />
          ))}
        </div>
        <p className="spinner-text">Cargando...</p>
      </div>
    </div>
  );
};

export default MultiCircleSpinner;






