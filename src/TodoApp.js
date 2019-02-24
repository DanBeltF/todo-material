import React from "react";
import {TodoList} from "./TodoList";
import moment from "moment";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

export class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', priority: 0, dueDate: moment()};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: ''
        }));
    }

    render() {
        return (
            <div align="center">
                <Card style={{ width: '300px' }}>
                    <CardContent>
                        <h3>New TODO</h3>

                        <TextField style={ {minWidth: 255 }}
                            id="text"
                            label="Text"
                            onChange={this.handleTextChange}
                            value={this.state.text}
                        />

                        <br/>
                        <br/>

                        <TextField style={ {minWidth: 255 }}
                            id="priority"
                            label="Priority"
                            type="number"
                            inputProps={{ min: "0", max: "5", step: "1" }}
                            onChange={this.handlePriorityChange}
                            value={this.state.priority}
                        />
                        <br/>
                        <br/>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker style={ {minWidth: 255 }}
                                autoOk
                                id="due-date"
                                label="Date"
                                minDate={new Date()}
                                onChange={this.handleDateChange}
                                value={this.state.dueDate}
                            />
                        </MuiPickersUtilsProvider>
                        <br/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit} >
                            Add #{this.state.items.length + 1}
                        </Button>
                    </CardActions>
                </Card>
                <br/>

                <Card style={{ width: '900px' }}>
                    <CardContent>
                        <TodoList todoList={this.state.items}/>
                    </CardContent>
                </Card>
                <br/>
                <br/>
            </div>
        );
    }
}