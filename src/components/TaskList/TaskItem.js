import React, {Component} from 'react';
import './TaskItem.css'

class TaskItem extends Component {
    onClickStatus(param){
        this.props.onClickStatus(param);
    }
    onClickDelete(param){
        this.props.onDelete(param);
    }
    onClickEdit(param){
        this.props.onEdit(param);
    }
    render() {
        const {task,index} = this.props;
        return (
            <tr>
                <td className='text-center'>{index + 1}</td>
                <td>
                    {task.name}
                </td>
                <td className='text-center'>
                    <span
                        onClick={()=>this.onClickStatus(task.id)}
                        className={task.status === true ? 'label label-success status' : 'label label-danger status'}
                    >
                        {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className='text-center'>
                    <button className='btn btn-warning' onClick={()=>this.onClickEdit(task.id)}>Sửa</button>
                    &nbsp;
                    <button className='btn btn-danger' onClick={()=>this.onClickDelete(task.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;