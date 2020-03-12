import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import styles from "./QuestionAdder.module.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import $ from "jquery";
import MathComponent from "../../components/mathComponent/mathComponent";
import SimpleReactValidator from 'simple-react-validator'
import { style } from "@material-ui/system";

//\frac{-b\pm\sqrt{b^2-4ac}}{2a}


class QuestionAdder extends Component {

    componentWillMount() {
        let newScript = document.createElement('script');
        newScript.type = "text/javascript"
        newScript.async = false;
        newScript.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";

        document.body.appendChild(newScript);
    }




    componentDidMount() {
        axios.get("http://localhost:5000/lookup/getboarddata")
            .then(res => {
                this.setState({ "boardMenu": res.data.data });
            })
            .catch(e => {
                console.log(e);
            });
        axios.get("http://localhost:5000/lookup/getclassdata")
            .then(res => {
                this.setState({ "classMenu": res.data.data });
            })
            .catch(e => {
                console.log(e);
            });
        axios.get("http://localhost:5000/lookup/getsubjectdata")
            .then(res => {
                this.setState({ "subjectMenu": res.data.data });
            })
            .catch(e => {
                console.log(e);
            });
        axios.get("http://localhost:5000/lookup/getdifficultyleveldata")
            .then(res => {
                this.setState({ "difficultyLevelMenu": res.data.data });
            })
            .catch(e => {
                console.log(e);
            });
        axios.get("http://localhost:5000/lookup/getimportanceleveldata")
            .then(res => {
                this.setState({ "importanceLevelMenu": res.data.data });
            })
            .catch(e => {
                console.log(e);
            }); 

        // console.log(this.boardMenu);
        // this.setState({ "boardmenu": ["CBSE", "ICSE", "IB"] })
        // this.setState({ "boardDropDown": true })
        // console.log(this.boardMenu);

    }



    constructor() {
        super()
        this.validator = new SimpleReactValidator();
    }

    state = {
        boardMenu: [],
        classMenu: [],
        subjectMenu: [],
        difficultyLevelMenu: [],
        importanceLevelMenu: [],
        board: "",
        standard: "",
        subject: "",
        difficultyLevel: "",
        importanceLevel: "",
        expectedTime: "",
        marks: "",
        source: "",
        question: "",
        createdBy: "",
        remarks: "",
        answer: "",
        answerExplanation: "",
        isMCQ: "",
        questionImage: null,
        answerImage: null,
        latex: "",
        wantMath: false,
        test: String.raw`what is the solution to equation $$\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$`
    }

    ChangeHandeler = (event) => {
        switch (event.target.name) {
            case "board": {
                this.setState({ "board": event.target.value });
                break;
            }
            case "standard": {
                this.setState({ "standard": event.target.value });
                break;
            }
            case "subject": {
                this.setState({ "subject": event.target.value });
                break;
            }
            case "difficultyLevel": {
                this.setState({ "difficultyLevel": event.target.value });
                break;
            }
            case "importanceLevel": {
                this.setState({ "importanceLevel": event.target.value });
                break;
            }
            case "expectedTime": {
                this.setState({ "expectedTime": event.target.value });
                break;
            }
            case "marks": {
                this.setState({ "marks": event.target.value });
                break;
            }
            case "source": {
                this.setState({ "source": event.target.value });
                break;
            }
            case "question": {
                this.setState({ "question": String.raw`${event.target.value}` });
                break;
            }
            case "createdBy": {
                this.setState({ "createdBy": event.target.value });
                break;
            }
            case "remarks": {
                this.setState({ "remarks": event.target.value });
                break;
            }
            case "answer": {
                this.setState({ "answer": event.target.value });
                break;
            }
            case "answerExplanation": {
                this.setState({ "answerExplanation": event.target.value });
                break;
            }
            case "isMCQ": {
                this.setState({ "isMCQ": event.target.value });
                break;
            }

        }
    }

    wantMathHandeler = (prevState) => {
        //console.log(prevState.wantMath);
        this.setState({ wantMath: !this.state.wantMath })
    }
    onChangeHandler = (event) => {
        if (event.target.name === "questionImage") {
            this.setState({
                questionImage: event.target.files
            })
        }
        else if (event.target.name === "answerImage") {
            this.setState({
                answerImage: event.target.files
            })
        }
    }

    mathChangeHandeler = (latex) => {
        this.setState({ "latex": latex });
        //console.log(this.state.latex);
        this.setState({ question: this.state.question + " $$" + latex + "$$" });
    }


    btnClickHandeler = () => {
        if (!this.validator.allValid()) {
            const errormessage = this.validator.getErrorMessages();
            var errorMessagesArray = Object.keys(errormessage).map((key)=> {
                return  errormessage[key];
              });
            var message =""
            errorMessagesArray.forEach(element => {
                message = message+"\n"+element
            });
                 alert("ERROR \n"+message)
            return
        }
        // console.log(this.state);
        const data = new FormData()
        data.append('board', this.state.board)
        data.append('standard', this.state.standard)
        data.append('subject', this.state.subject)
        data.append('difficultyLevel', this.state.difficultyLevel)
        data.append('importancelevel', this.state.importanceLevel)
        data.append('marks', this.state.marks)
        data.append('question', this.state.question)
        data.append('answer', this.state.answer)
        data.append('isMCQ', this.state.isMCQ)
        data.append('source', this.state.source)
        if (this.state.questionImage != null) {
            for (var x = 0; x < this.state.questionImage.length; x++) {
                data.append('questionImage', this.state.questionImage[x])
            }
        } if (this.state.answerImage != null) {
            for (var x = 0; x < this.state.answerImage.length; x++) {
                data.append('answerImage', this.state.answerImage[x])
            }
        }
        let config = {
            headers: {
                Authorization: this.props.token
            }
        }
        axios.post("http://localhost:5000/content/questions/add", data, config)
            .then(res => {
                alert(res.data.msg)
            }
            ).catch((e) => {
                alert("Error!! Unable to add question")

            })


    }


    render() {
        // let board = <FormControl className={styles.formControl}>
        //     <InputLabel htmlFor="board-simple">Board</InputLabel>
        //     <Select
        //         className={styles.select}
        //         value={this.state.board}
        //         onChange={this.ChangeHandeler}
        //         inputProps={{
        //             name: 'board',
        //             id: 'board-simple',
        //         }}
        //     >
        //         {this.state.boardMenu.map((element, index) => (
        //             <MenuItem value={element.boardCode} key={index}>{element.name}</MenuItem>
        //         ))}
        //         <MenuItem value={"CBSE"}>CBSE</MenuItem>

        //     </Select>
        // </FormControl>

        return (
            <div align="center" className={styles.root}>
              
                <form className={styles.formStyle}>
                    <h2 className={styles.headers}>Add a question to the database</h2>
                    <br /><hr/><br /><br/>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="board-simple">Board</InputLabel>
                        <Select
                            className={styles.select}
                            value={this.state.board}
                            onChange={this.ChangeHandeler}
                            inputProps={{
                                name: 'board',
                                id: 'board-simple',
                            }}

                        >
                            {this.validator.message('board', this.state.board, 'required')}
                            {this.state.boardMenu.map((element, index) => (
                                <MenuItem value={element.boardCode} key={index}>{element.name}</MenuItem>
                            ))}
                            <MenuItem value={"CBSE"}>CBSE</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="class-simple">Class</InputLabel>
                        <Select
                            value={this.state.standard}
                            className={styles.select}
                            onChange={this.ChangeHandeler}
                            inputProps={{
                                name: 'standard',
                                id: 'standard-simple',
                            }}
                        >
                            {this.validator.message('standard', this.state.standard, 'required')}
                            {this.state.classMenu.map((element, index) => (
                                <MenuItem value={element.classCode} key={index}>{element.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="subject-simple">Subject</InputLabel>
                        <Select
                            value={this.state.subject}
                            onChange={this.ChangeHandeler}
                            className={styles.select}
                            inputProps={{
                                name: 'subject',
                                id: 'subject-simple',
                            }}
                        >
                            {this.validator.message('subject', this.state.subject, 'required')}
                            {this.state.subjectMenu.map((element, index) => (
                                <MenuItem value={element.subjectCode} key={index}>{element.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="difficulty-simple">DifficultyLevel</InputLabel>
                        <Select
                            value={this.state.difficultyLevel}
                            onChange={this.ChangeHandeler}
                            className={styles.select}
                            inputProps={{
                                name: 'difficultyLevel',
                                id: 'difficulty-simple',
                            }}
                        >
                            {this.validator.message('difficutlyLevel', this.state.difficultyLevel, 'required')}
                            {this.state.difficultyLevelMenu.map((element, index) => (
                                <MenuItem value={element.code} key={index}>{element.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="difficulty-simple">ImportanceLevel</InputLabel>
                        <Select
                            value={this.state.importanceLevel}
                            onChange={this.ChangeHandeler}
                            className={styles.select}
                            inputProps={{
                                name: 'importanceLevel',
                                id: 'difficulty-simple',
                            }}

                        >
                            {this.validator.message('importanceLevel', this.state.importanceLevel, 'required')}
                            {this.state.importanceLevelMenu.map((element, index) => (
                                <MenuItem value={element.code} key={index}>{element.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className={styles.text}>
                        <FormControl>
                            <TextField
                                className={styles.text}
                                error={false}
                                label="Expected Time"
                                name="expectedTime"
                                onChange={this.ChangeHandeler}
                            />
                            {this.validator.message('expectedTime', this.state.expectedTime, 'required|numeric')}
                        </FormControl>
                    </div>
                    <div className={styles.text}>
                        <FormControl>
                            <TextField
                                error={false}
                                label="Marks"
                                name="marks"
                                className={styles.text}
                                onChange={this.ChangeHandeler}
                            />
                            {this.validator.message('marks', this.state.marks, 'required|numeric')}
                        </FormControl>
                    </div>
                     <div className={styles.source}>
                    <TextField
                        label="Source"
                        name="source"
                        fullWidth
                        onChange={this.ChangeHandeler}
                    />
                    </div>

                     <div className={styles.source}>
                    <TextField
                        label="Created By(Your Name)"
                        name="createdBy"
                        fullWidth
                        onChange={this.ChangeHandeler}
                        
                    />
                    </div>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="isMCQ-simple">Is MCQ?</InputLabel>
                        <Select
                            value={this.state.isMCQ}
                            onChange={this.ChangeHandeler}
                            className={styles.select}
                            inputProps={{
                                name: 'isMCQ',
                                id: 'isMCQ-simple',
                            }}
                        >
                            {this.validator.message('isMCQ', this.state.isMCQ, 'required')}
                            <MenuItem value={true}>Is a MCQ Question</MenuItem>
                            <MenuItem value={false}>Is not a MCQ Question</MenuItem>
                        </Select>
                    </FormControl>

                    <div className={styles.mlText} ref={el => (this.instance = el)}>
                        <TextField
                            onChange={this.ChangeHandeler}
                            value={this.state.question}
                            label="Question"
                            name="question"
                            multiline
                            rows="4"
                            fullWidth
                            margin="normal"
                        />
                        <div className={styles.mathButton} >
                            <Button  className={styles.margin + " " + styles.btn} variant="contained" size="large" onClick={this.wantMathHandeler}>Add Equation</Button>
                            {this.state.wantMath ? <MathComponent setMath={(latex) => this.mathChangeHandeler(latex)} /> : null}
                        </div>
                        <p>{String.raw`smn $$\int_{0}^{\pi}\frac{x^{4}\left(1-x\right)^{4}}{1+x^{2}}dx =\frac{22}{7}-\pi$$`}</p>
                        <p id="questionPreview">{this.state.question}</p>
                    </div>
                    <div className={styles.mlText}>
                        <TextField
                            onChange={this.ChangeHandeler}
                            label="Remarks for Question"
                            name="remarks"
                            multiline
                            rows="2"
                            fullWidth
                            margin="normal"
                        />

                    </div>
                    <div className={styles.mlText}>
                        <TextField
                            name="answer"
                            label="Answer"
                            multiline
                            rows="4"
                            fullWidth
                            margin="normal"
                            onChange={this.ChangeHandeler}
                        />
                        {this.validator.message('answer', this.state.answer, 'required')}

                    </div>
                    <div className={styles.mlText}>
                        <TextField
                            name="answerExplanation"
                            label="Answer Explanation(If any)"
                            multiline
                            rows="4"
                            fullWidth
                            margin="normal"
                            onChange={this.ChangeHandeler}
                        />

                    </div>


                    <br /><br /><br />
                    <div className={styles.Image}>
                    <div className={styles.inputStyle}>
                        <InputLabel htmlFor="questionImage">Question Image</InputLabel>
                        </div>
                        <div className={styles.imageInput}>
                        <input type="file" name="questionImage" multiple onChange={this.onChangeHandler}/>
                        </div> 
                        </div>
                    


                    <br /><br />
                    <div className={styles.Image}>
                    <div className={styles.inputStyle}>
                        <InputLabel htmlFor="answerImage">Answer Image</InputLabel>
                        </div>
                        <div className={styles.imageInput}>
                        <input type="file" name="answerImage" multiple onChange={this.onChangeHandler} />
                        
                    </div>
                    </div>


                    <br /><br />
                    <FormControl>
                        
                        <Button variant="contained" size="large" color="primary" onClick={this.btnClickHandeler} className={styles.margin + " " + styles.btn}>
                            Submit Question
                        </Button>
                        
                    </FormControl>


                </form>
                </div>
            
        );

    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(QuestionAdder);