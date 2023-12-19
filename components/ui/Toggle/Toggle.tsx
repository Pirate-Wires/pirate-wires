import Toggle from 'react-toggle';
import './Toggle.css';

const ToggleButton = ({checked, onChange}) => {
    return (
        <Toggle
            defaultChecked={checked}
            icons={false}
            onChange={onChange}
        />
    );
};

export default ToggleButton;