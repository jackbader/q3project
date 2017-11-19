import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import List from './List';
import 'react-day-picker/lib/style.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
    };
  }
  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
      const selectDay = day;
      console.log(selectDay)
    }
    this.setState({ selectedDays });
    this.props.sendSelectedDays(this.state.selectedDays)
  }
  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
        {/* <List
          // selectedDays={this.state.selectedDays}
        /> */}
      </div>
    );
  }
}
