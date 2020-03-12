import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import styles from "../../containers/questionAdder/QuestionAdder.module.css";
export default class mathComponent extends Component {
    componentDidMount = () => {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = "  var MQ = MathQuill.getInterface(MathQuill.getInterface.MAX); var latex = $('#basic-latex').bind('keydown keypress', function () { var prev = latex.val(); setTimeout(function () {        var now = latex.val();        if (now !== prev) mq.latex(now);});}); var latexCode='';     var mq = MQ.MathField($('#basic')[0], { autoSubscriptNumerals: true,          handlers: {      edit: function () {    if (!latex.is(':focus')) latex.val(mq.latex()); latexCode=mq.latex(); }  } }); latex.val(mq.latex());";

        this.instance.appendChild(s);

    }

    btnClickHandeler = (event) => {
        event.preventDefault()
        let latex = document.getElementById("basic-latex").value
        
        this.props.setMath(latex);
    }

    render() {
        return (
            <div id="body"  ref={el => (this.instance = el)}>

                <p><span id="basic">Equation</span></p>

                <p><textarea id="basic-latex"></textarea></p>

                <Button variant="contained" size="large" color="primary" onClick = {this.btnClickHandeler} className={styles.margin + " " + styles.btn}>
                   Submit 
                </Button>
              
            </div>
        )
    }
}
