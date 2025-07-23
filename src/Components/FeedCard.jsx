const FeedCard = ({user}) => {
    const {firstName, lastName, photoURL, about, age, gender} = user
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src= {photoURL}
            alt="Profile Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " "+ lastName}</h2>
          {about && <p>About: {about}</p>}
          {gender && <p>Gender: {gender}</p>}
          {age && <p>Age: {age}</p>}
          <div className="flex justify-between">
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">intrested</button>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">ignore</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
