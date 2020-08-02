import React, {Component} from 'react';
import TaskItem from "./TaskItem";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        }
    }
    onClickStatus = (param)=>{
        this.props.onChangeStatus(param);
    }
    onClickDelete = (param)=>{
        this.props.onDelete(param);
    }
    onClickEdit = (param)=>{
        this.props.onEdit(param);
    }
    onChange = (event)=>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );
        this.setState({
            [name] : value
        });
    }
    render() {
        const {taskList} = this.props;
        const {filterName,filterStatus} = this.state;
        return (
            <div className="row mt-15">
            <div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className='text-center'>STT</th>
                            <th className='text-center'>Tên</th>
                            <th className='text-center'>Trạng thái</th>
                            <th className='text-center'>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='filterName'
                                    value={filterName}
                                    onChange={this.onChange}
                                />
                            </td>
                            <td>
                                <select
                                    name="filterStatus"
                                    className="form-control"
                                    value={filterStatus}
                                    onChange={this.onChange}
                                >
                                    <option value={-1}>Tất cả</option>
                                    <option value={0}>Ẩn</option>
                                    <option value={1}>Kích hoạt</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {
                            taskList.map((task,index)=>{
                                return (
                                    <TaskItem
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onClickStatus = {this.onClickStatus}
                                    onDelete = {this.onClickDelete}
                                    onEdit = {this.onClickEdit}
                                    />
                                    )
                            })
                        }

                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}

export default TaskList;