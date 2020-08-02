import React, {Component} from 'react';

class Sort extends Component {
    onClick = (sortBy,sortValue)=>{
        this.props.onSort(sortBy,sortValue);
    }
    render() {
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <button className='btn btn-primary' onClick={()=>this.onClick('name',1)}>Tên từ a - z</button>
                    &nbsp;
                    <button className='btn btn-primary' onClick={()=>this.onClick('name',-1)}>Tên từ z - a</button>
                    &nbsp;
                    <button className='btn btn-primary' onClick={()=>this.onClick('status',1)}>Trạng thái kích hoạt</button>
                    &nbsp;
                    <button className='btn btn-primary' onClick={()=>this.onClick('status',-1)}>Trạng thái ẩn</button>
                </div>
            </div>
        );
    }
}

export default Sort;