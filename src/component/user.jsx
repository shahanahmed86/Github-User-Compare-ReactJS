import React, {Component} from 'react';
import Preview from './preview';
import Winner from './winner';

function DataInput (name, image, followers, following, repository, checked) {
    this.name = name;
    this.image = image;
    this.followers = followers;
    this.following = following;
    this.repository = repository;
    this.checked = checked
    this.sum = followers + following + repository;
}

export default class User extends Component {
    constructor() {
        super();

        this.state = {
            user: '',
            data: [],
            winner: {},
            viewWinner: false,
        }
    }
    getValue = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    }
    onSaveHandler = () => {
        const data = this.state.data.slice(0);
        if (this.state.user) {
            fetch('https://api.github.com/users/' + this.state.user)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    throw Error(resp.statusText);
                }
            })
            .then(getResp => {
                const duplicate = data.some(value => value.name === getResp.name);
                if (duplicate) {
                    alert('Can not add same user again !');
                }
                else {
                    data.push(new DataInput(
                            getResp.name,
                            getResp.avatar_url,
                            getResp.followers,
                            getResp.following,
                            getResp.public_repos,
                            false,
                        ),
                    );
                    this.setState({
                        data,
                        winner: {},
                        viewWinner: false,
                        user: '',
                    })
                }
            })
            .catch(Error => alert('Can not find user : ' + this.state.user + ' ' + Error))
        }
        else {
            alert('The Field can not be left empty');
        }
    }
    getList = (index, target) => {
        const data = this.state.data.slice(0);
        if (target.checked) {
            data[index].checked = true;
        }
        else {
            data[index].checked = false;
        }
        this.setState({
            data,
            user: '',
            winner: {},
            viewWinner: false,
        });
    }
    onDismiss = () => {
        const data = this.state.data.filter((value, ind) => value.checked === false);
        this.setState({
            user: '',
            data,
            winner: {},
            viewWinner: false,
        });
    }
    toBegin = () => {
        const data = this.state.data.filter(value => value.checked === true);
        let draw = false; 
        if (data.length > 1) {
            let winner = data.reduce((prev, curr) => {
                if (prev.sum > curr.sum) {
                    draw = false; 
                    return prev;
                }
                else if (prev.sum < curr.sum ) {
                    draw = false; 
                    return curr;
                }
                else {
                    draw = true; 
                    return curr;
                }
            }, {sum: 0});
            if(draw) {
                winner = 'Draw'
            }
            this.setState({
                user: '',
                winner,
                viewWinner: true,
            });
        }
        else {
            alert('Minimum Users required are atleast two (02)');   
        }
    }
    render() {
        return(
            <div className='container'>
                <h3>Github User Comparison</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Id :</th>
                            <td>
                                <input
                                    type='text' value={this.state.user} name='user'
                                    onChange={this.getValue} className='form-control' />
                            </td>
                            <td>
                                <input
                                    type='button' onClick={this.onSaveHandler} className='btn btn-primary btn-sm'
                                    value={!this.state.data.length > 0 ? 'Add 1' : 'Add ' + (this.state.data.length + 1)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {this.state.data.length > 0 ?
                    <Preview
                        data={this.state.data} getRow={this.getList}
                        getStart={this.toBegin} onDel={this.onDismiss} /> : ''}
                {this.state.viewWinner ?
                    <Winner data={this.state.winner} /> : ''}
            </div>
        );
    }
}