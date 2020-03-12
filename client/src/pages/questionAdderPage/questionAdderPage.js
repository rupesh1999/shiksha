import React, { Component } from 'react';
import QuestionAdder from "../../containers/questionAdder/questionAdder";

export default class questioAdderPage extends Component {
    render() {
        return (
            <div>
                <QuestionAdder age={20}/>
            </div>
        )
    }
}
