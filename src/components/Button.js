import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => { 
    //catch the onClick event here with the propTypes section -> easier debugging?
    //onClick goes back to the header and calls the function. 

    //FYI, onClick={onClick} is the onClick event calling a function called "onClick"
    //Is there a way to call a function inside of a component from parent component?
    //- YES, make it a prop back in header
    return (
    <button style = {{backgroundColor: color}} className='btn' onClick={onClick}>{text}</button>
  )
}

Button.defaultProps = {
    backgroundColor: "black",
    color: "white", //text color
    text: "hello"
};

Button.propTypes = {
    text: PropTypes.string, 
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button 