import React, {Component} from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }
    onChange = (e)=>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        });
    }

    onSearch = ()=>{
        const {keyword} = this.state;
        this.props.onSearch(keyword);
    }

    render() {
        const {keyword} = this.state;
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className='input-group'>
                        <input type="text"
                               name="keyword"
                               id="inputID"
                               className="form-control"
                               value={keyword}
                               onChange={this.onChange}
                        />
                        <span className='input-group-btn'>
                            <button
                                className='btn btn-primary'
                                onClick={this.onSearch}
                            >
                                Tìm
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;