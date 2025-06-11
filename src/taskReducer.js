import Task from "./Components/Task";

export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
                dueDate: action.payload.dueDate,
                createdAt: new Date().toISOString()
            }];
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
            
        case 'DELETE_ALL':
            return [];

        case 'DELETE_DUE_DATE':
            return state.map(task => 
                task.id === action.payload
                    ? {...task, dueDate: "" }
                    : task
            );

        case 'TOGGLE_TASK':
            return state.map(task => 
                task.id === action.payload
                    ? {...task, completed: !task.completed }
                    : task
            );
    
        default:
            return state;
    }
}