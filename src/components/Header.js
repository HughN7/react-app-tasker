//Could be a class or a function
// import React from 'react' //don't need this anymore
/*
const Header = (props) => {
    return (
        <div>Task Tracker {props.title}</div>
    )
}*/

import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAddTask, showAddTask}) => { //This here destructures title from the passed in prop. Slightly simpler

    return (
    //FYI, onClick={onClick} is the onClick event calling a function called "onClick"
    //For button component, color, text, onclick, etc are all props passed into Button component
    <header className='header'>
        <h1>{title}</h1>
        <Button color = {showAddTask ? 'red': 'green'} text = {showAddTask ? 'Close': 'Add'} onClick={onAddTask}/> 
    </header>
    )
}

const headingStyle = {
    color: "white",
    backgroundColor: "black"
}

//This is creating default values (optional)
Header.defaultProps = {
    title: "React Component",
};

//Adding types to react. Forcing title to be a type of string (not int, etc.)
Header.propTypes = {
    title: PropTypes.string.isRequired, 

}

export default Header