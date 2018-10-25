import React from 'react';

const Preview = ({data, getRow, getStart, onDel}) => {
    return(
        <div>
            <hr />
            <h3>Github Users List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Choose</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Repository</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(
                        (value, ind) => {
                            return(
                                <tr key={ind}>
                                    <td>
                                        <input
                                            type='checkbox' id={'ch' + ind} checked={value.checked}
                                            onChange={event => getRow(ind, event.target)} />
                                    </td>
                                    <td>
                                        <label htmlFor={'ch' + ind}>
                                            <img src={value.image} alt={value.name} width='100' height='100' />
                                        </label>
                                    </td>
                                    <td>
                                        <label htmlFor={'ch' + ind}>
                                            {value.name}
                                        </label>
                                    </td>
                                    <td>
                                        <label htmlFor={'ch' + ind}>
                                            {value.followers}
                                        </label>
                                    </td>
                                    <td>
                                        <label htmlFor={'ch' + ind}>
                                            {value.following}
                                        </label>
                                    </td>
                                    <td>
                                        <label htmlFor={'ch' + ind}>
                                            {value.repository}
                                        </label>
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
            <hr />
            <input 
                type='button' value='Delete' className='btn btn-danger btn-sm'
                onClick={onDel} />
            <input 
                type='button' value='Start' className='btn btn-success btn-sm'
                onClick={getStart} />
        </div>
    );
}

export default Preview;