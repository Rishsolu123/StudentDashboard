import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getStudentsResult } from '../../../Actions/StudentResultAction';


class StudentDesc extends Component {
    constructor(props){
        super(props);
        this.state ={
            id: this.props.match.params.id
        }
        console.log(this.props.match.params.id);
    }
    
    componentDidMount(){
        const {onGetStudentResult} = this.props;
        onGetStudentResult();
    }
    
    render() {
    const { id } = this.state;
    const { studentData = [] } = this.props;
    const data = studentData.filter( (data) => {return data.id.toString() === id.toString()} )
    if(data !== undefined && data !== null && data.length > 0){

        const [{id, name, total, class: className , rollNo }] = data;
        return (
            <div>
                <div>Id: <span>{id}</span></div>
                <div>Name: <span>{name}</span></div>
                <div>Class: <span>{className}</span></div>
                <div>Roll No: <span>{rollNo}</span></div>
                <div>Total Marks: <span>{total}</span></div>
            </div>
        )
    
    }
    return null;
}
    
}

const mapStateToProps = state => {
    const { result = {} } = state;
    const { studentData = [] } = result;
    return {
        studentData,
    };
  };
  

  
  const mapDispatchToProps = dispatch => ({
    onGetStudentResult: () => dispatch(getStudentsResult())
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudentDesc);
