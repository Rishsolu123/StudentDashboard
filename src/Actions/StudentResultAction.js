import ActionTypes from './ActionTypes';


// using delay to create effect of api calling
export const getStudentsResult = () => {
    return dispatch => {
      console.log("dispatch");
      dispatch({ type: ActionTypes.STUDENT_DATA_REQUEST });

    fetch(`https://api.myjson.com/bins/1dlper`)
    // We get the API response and receive data in JSON format...
    .then(response => response.json())
    .then(data =>
        {
            console.log('-----data------', data)
            dispatch({
                type: ActionTypes.STUDENT_DATA_REQUEST_SUCCESS,
                result: data
              })
        }
    )
    .catch(error => 
        {
            console.log('-----error------', error)
            dispatch({
                type: ActionTypes.STUDENT_DATA_REQUEST_ERROR,
                error: error
              })
        }
        );
    };
}