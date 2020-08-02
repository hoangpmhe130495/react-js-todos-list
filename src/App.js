import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import TaskForm from "./components/TaskForm/TaskForm";
import Control from "./components/Control/Control";
import TaskList from "./components/TaskList/TaskList";
import {findIndex} from "lodash";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm: false,
            taskEditing: null,
            filter : {
                filterName: '',
                filterStatus: -1
            },
            keyword : '',
            sortBy : 'name',
            sortValue : 1

        }
    }


    componentDidMount() {
        if(localStorage && localStorage.getItem('tasks')){
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            })
        }
    }

    s4(){
        return Math.floor((1*Math.random())*0x10000).toString(16).substring(1);
    }
    genID(){
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4();
    }
    showForm = ()=> {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        })
    }
    onCloseForm = (param)=>{
        this.setState({
            isDisplayForm : param
        })
    }
    onSubmitForm = (param)=>{
        console.log(JSON.stringify(param));
        let {tasks} = this.state;
        if(param.id===''){
            const taskItem =
                {
                    id : this.genID(),
                    name: param.name,
                    status : param.status
                };
            tasks.push(taskItem);
        }else{
            const index = this.findIndex(param.id);
            tasks[index] = param
        }
        localStorage.setItem('tasks',JSON.stringify(tasks));
        this.setState({
            tasks : tasks,
            taskEditing: null
        });
    }
    onChangeStatus = (param)=>{
        const {tasks} = this.state;
        // const index = this.findIndex(param);
        const index = findIndex(tasks,(task)=>{
            return task.id === param;
        });
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }

    }
    onDelete = (param)=>{
        const {tasks} = this.state;
        const index = this.findIndex(param);
        if(index !== -1){
            tasks.splice(index,1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        this.onCloseForm(false);
    }
    onEdit = (param)=>{
        const {tasks} = this.state;
        const index = this.findIndex(param);
        const taskEditing = tasks[index];
        console.log('onEdit '+ JSON.stringify(taskEditing));
        this.setState({
            taskEditing : taskEditing
        });
        this.onCloseForm(true);

    }
    findIndex = (id)=>{
        const {tasks} = this.state;
        let result = -1;
        tasks.forEach((task,index)=>{
            if(task.id===id){
                result = index;
            }
        });
        return result;
    }

    onFilter = (filterName,filterStatus) =>{
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter : {
                filterName: filterName.toLowerCase(),
                filterStatus: filterStatus
            }
        });
    }
    onSearchKeyword = (param)=>{
        this.setState({
            keyword : param.toLowerCase()
        })
    }
    onSort = (sortBy,sortValue)=>{
        this.setState({

            sortBy : sortBy,
            sortValue : parseInt(sortValue)

        });
    }

    render() {
        let {tasks,
            isDisplayForm,
            taskEditing,
            filter,
            keyword,
            sortBy,
            sortValue
        } = this.state;
        if(filter){
            if(filter.filterName) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.filterName) !== -1
                });
            }
            tasks = tasks.filter((task)=>{
                if(filter.filterStatus === -1){
                    return task;
                }else{
                    return task.status === (filter.filterStatus === 1 ? true : false);
                }
            });
        }
        if(keyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            });
        }
        if(sortBy === 'name'){
            tasks.sort((a,b)=>{
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
            });
        }else{
            tasks.sort((a,b)=>{
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
            });
        }
        return (
            <div className='container'>
                <div className='text-center'>
                  <h1>Quản lí công việc</h1>
                </div>
              <div className='row'>
                  {isDisplayForm===true ? (<TaskForm
                      onSubmit={this.onSubmitForm}
                      onCloseForm={this.onCloseForm}
                      task={taskEditing}
                  />): ''}
                  <div className={isDisplayForm===true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8 mt-15' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15'}>
                      <button type="button" className="btn btn-primary" onClick={this.showForm}>Thêm Công Việc</button>
                      <Control
                          onSearch = {this.onSearchKeyword}
                          onSort = {this.onSort}
                      />
                      <TaskList
                          taskList={tasks}
                          onChangeStatus={this.onChangeStatus}
                          onDelete={this.onDelete}
                          onEdit={this.onEdit}
                          onFilter={this.onFilter}
                      />
                  </div>
              </div>
            </div>
        );
    }
}

export default App;