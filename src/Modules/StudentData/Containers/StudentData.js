import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getStudentsResult } from '../../../Actions/StudentResultAction';
import StudentCard from '../Components/StudentCard';
import styles from '../styles'
import ActionTypes from '../../../Actions/ActionTypes';

class StudentData extends Component {

    constructor(props){
        super(props)
        this.state=({value:'', latestStudentData: [], isLoaded: false})
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { studentData = [] } = nextProps;
        const { isLoaded} = prevState;
        if(!isLoaded && studentData.length > 0){
            return{
                latestStudentData: studentData,
                isLoaded: true
            }
        }
      }

    componentDidMount(){
        const {onGetStudentResult} = this.props;
        onGetStudentResult();
    }

    handleChange = (event) => {       
        const value = event.target.value;
        const {studentData = []} = this.props
        const latestStudentData = studentData.filter( (student) => { return student.name.toLowerCase().startsWith(value.toLowerCase())});
        this.setState({
            value: value,
            latestStudentData: latestStudentData,
        });
      }
    
    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    
    toggleName = () => {
        const { latestStudentData = [], increasingName = true } = this.state;
        this.setState({
            increasingName: !this.state.increasingName,
            latestStudentData: increasingName ? latestStudentData.sort( (a, b) => (a.name > b.name ? 1 : -1)) : 
            latestStudentData.sort((a, b) => (a.name > b.name ? -1 : 1))
        })

    } 

    toggleMark = () => {
        const { latestStudentData = [], increasingTotalMark = false } = this.state;
        this.setState({
            increasingTotalMark: !this.state.increasingTotalMark,
            latestStudentData: increasingTotalMark ? latestStudentData.sort( (a, b) => (a.name > b.name ? 1 : -1)) : 
            latestStudentData.sort((a, b) => (a.name > b.name ? -1 : 1))
        })
    }


    onLogout = () => {
        const { logout } = this.props;
        logout();
        setTimeout(() => {
            window.location.href = '/';
          }, 300)
    };


    render() {
        const { latestStudentData = [] } = this.state;
        let studentCards = latestStudentData.map( (data) => <StudentCard data={data} /> )       
        return (
            <div style={styles.topnav}>
                <div>
                      <input type="text" style={styles.myInput} value={this.state.value} 
                      onChange={this.handleChange}
                      placeholder="Search for students.." title="Type in a name"></input>
                      <button style={styles.inner} type="button" onClick={this.toggleName}>ToggleName</button>
                      <button style={styles.inner} type="button" onClick={this.toggleMark}>ToggleMark</button>
                      <button style={styles.inner} type="button" onClick={this.onLogout}>Log Out</button>
                </div> 
                <div className="cardContainer">
                {studentCards}
                </div>   
            </div>
        )
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
    onGetStudentResult: () => dispatch(getStudentsResult()),
    logout: () => {
        dispatch({ type: ActionTypes.RESET, payload: {} });
      },
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudentData);
