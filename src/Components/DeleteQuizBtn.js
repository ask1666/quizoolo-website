import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class deleteQuizBtn extends React.Component {

    render() {
        return (
            <button onClick={this.handleDelete} className="block h-auto w-1/5 text-center bg-red-500">
            <FontAwesomeIcon className="fa-lg"
                icon={faTrash}
                
            />
            </button>
        )
    }

    handleDelete() {
        
    }

}

export default deleteQuizBtn;