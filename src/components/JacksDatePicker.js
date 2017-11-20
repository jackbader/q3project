import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class JacksDatePicker extends React.Component {
  constructor (props) {
    super(props)
    if (typeof props.date != 'undefined') {
      this.state = {
        startDate: moment(props.date)
      };
    } else {
      this.state = {
        startDate: moment()
      };
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
    />;
  }
}

export default JacksDatePicker
