import ActionTypes from '../Actions/ActionTypes';

const {
    STUDENT_DATA_REQUEST,
    STUDENT_DATA_REQUEST_SUCCESS,
    STUDENT_DATA_REQUEST_ERROR,
    RESET,
} = ActionTypes;

const initialState = {
  loading: false,
  studentData: [],
  error: '',
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        studentData: [],
        error: '',
      };
    case STUDENT_DATA_REQUEST_SUCCESS:
    {
      const studentData = [];
      const { result = {} } = action;
      for(var id in result){  // adding id to student object and sum of all subjects
        const { marks = {}} = result[id];
        let total = 0;
        for(var subject in marks){
          total += marks[subject];
        }

        result[id].id = id;
        result[id].total = total;

        studentData.push(result[id]);
      }

      return {
        ...state,
        loading: false,
        studentData: studentData,
        error: '',
      };

    }
    case STUDENT_DATA_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        studentData: [],
        error: action.error,
      };
    case RESET:
      return {
        ...state,
        loading: false,
        studentData: [],
        error: '',
      };
    default:
      return state;
  }
};

export default resultReducer;
