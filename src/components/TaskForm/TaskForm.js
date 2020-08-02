import React, {Component} from 'react';
import './TaskForm.css'

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            id:'',
           name : '',
           status : true
        });
    }
    componentWillMount() {
        const {task} = this.props
        if(task){
            this.setState({
                id: task.id,
                name : task.name,
                status : task.status
            });
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        }
    }

    onClose = ()=>{
        if(this.props.onCloseForm){
            this.props.onCloseForm(false)
        }
    }
    onSubmitForm = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onClose();
    }
    onChange = (event)=>{
        const target = event.target;
        const name = target.name;
        let value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
            console.log('Task F '+value);
        }
        this.setState({
            [name] : value
        })
    }
    onClear = ()=>{
        this.setState({
            name : '',
            status : true
        })
    }

    render() {
        const {id} = this.state;
        return (
            <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4 mt-15'>
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title title-toggle" onClick={this.onClose}>{id === '' ? 'Thêm Công Việc' : 'Sửa Công Việc'}</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmitForm}>
                            <div className="form-group">
                                <label>Tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Trạng thái</label>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label"></label>
                                    <select
                                        className="form-control"
                                        name='status'
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        <option value={true}>Kích hoạt</option>
                                        <option value={false}>Ẩn</option>
                                    </select>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Lưu lại</button>
                            &nbsp;
                            <button type="button" onClick={this.onClear} className="btn btn-warning">Hủy bỏ</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskForm;