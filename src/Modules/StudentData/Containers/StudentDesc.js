import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getStudentsResult } from '../../../Actions/StudentResultAction';
import BarChart from '../Components/BarChart'
import styles from '../styles'

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
        const [{id, name, total, class: className , rollNo, marks }] = data;

      const _subjectData = [];
      for (let key in marks) {
        _subjectData.push({x: key, y: marks[key]});
      }

        return (
            <div style={styles.detailCard}>
                <div style={styles.detailItem}>Id: <span>{id}</span></div>
                <div style={styles.detailItem}>Name: <span>{name}</span></div>
                <div style={styles.detailItem}>Class: <span>{className}</span></div>
                <div style={styles.detailItem}>Roll No: <span>{rollNo}</span></div>
                <div style={styles.detailItem}>Total Marks: <span>{total}</span></div>
                <div style ={styles.barChart}>
                <BarChart data = {_subjectData}/>
                </div>
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
