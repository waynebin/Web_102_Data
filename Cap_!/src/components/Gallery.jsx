const Gallery = ({ images }) => {
  return (
    <>
      <h2>Your Screenshot Gallery!</h2>

      <div className="image-container">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="gallery-image"
            />
          ))
        ) : (
          <div>
            <h3>You haven't made a screenshot yet!</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;