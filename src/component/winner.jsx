import React from 'react';

const Winner = ({data}) => {
    return(
        <div>
            <hr />
            {typeof(data) === 'string' ?
                <h1>{data}</h1> :
                <div>
                    <h1>Winner !</h1>
                    <div className="card">
                        <img
                            src={data.image} alt={data.name}
                            className="card-img-top" />
                        <div className="card-body">
                            <p className="card-text">Title Name = <b>{data.name}</b></p>
                            <p className="card-text">Followers = <i>{data.followers}</i></p>
                            <p className="card-text">Following = <i>{data.following}</i></p>
                            <p className="card-text">Repository = <i>{data.repository}</i></p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Winner;