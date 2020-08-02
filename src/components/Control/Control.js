import React, {Component} from 'react';
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component {
    onSearch = (param)=>{
        this.props.onSearch(param);
    }
    render() {
        return (
            <div>
                <div className='row mt-15'>
                    <Search onSearch={this.props.onSearch} />
                    <Sort onSort={this.props.onSort}/>
                </div>
            </div>
        );
    }
}

export default Control;