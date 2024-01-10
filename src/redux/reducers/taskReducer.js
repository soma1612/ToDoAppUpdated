const initialState = {
    saveTask: [],
    completeTask:[],
    deleteTask:[],
    selectedTaskToEdit: null,
};

const taskReducer = (state = initialState, action) => {
   //debugger;
    switch (action.type) {
        case 'SAVE_TASK':
            return {
                ...state,
                saveTask: [...state.saveTask, action.payload]
            };

        case 'SELECT_TASK_TO_EDIT':
            return{
                ...state,
                selectedTaskToEdit:action.payload,
            };

        case 'EDIT_TASK':
            return{
                ...state,
                saveTask:state.saveTask.map((data)=> data.id === state.selectedTaskToEdit
                ?{...data,...action.payload}:data
                ),
                selectedTaskToEdit:null,
            }; 

        case 'COMPLETE_TASK':
            const completeTask= state.saveTask.find((data) => data.id === action.payload);
            return {
                ...state,
                saveTask: state.saveTask.filter((data) => data.id !== action.payload),
                completeTask: [...state.completeTask, completeTask]
            }; 
        case 'DELETE_TASK':
            const deleteTask= state.saveTask.find((data) => data.id === action.payload);
            return {
                ...state,
                saveTask: state.saveTask.filter((data) => data.id !== action.payload),
                deleteTask: [...state.deleteTask, deleteTask]
            };     
        default:
            return state;
    }
}

export default taskReducer;