import React, { Fragment } from "react";
import {
    MDBCard, MDBCardHeader, MDBBtn,
    MDBCardFooter, MDBCardBody,
    MDBCardTitle, MDBCardText, MDBRow, MDBCol,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBadge,
    MDBInput,
    MDBTextArea,
    MDBInputGroup

} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import { getTasks, deleteTask, updateStatus } from '../../api/tasks-api'
import Auth from '../../auth/Auth'
import { TaskModel } from '../../types/Task'
import { History } from 'history'

import {
    Button,
    Grid,
    Icon,
    Loader
} from 'semantic-ui-react'

export interface TaskProps {
    colorBorder: any
    textColor: any
    auth: Auth
    history: History
}

export interface TaskState {
    basicModal: Boolean
    tasks: TaskModel[]
    loadingTodos: Boolean
}

export class TaskDefine extends React.PureComponent<TaskProps, TaskState> {
    constructor(props: TaskProps) {
        super(props)
        this.state = {
            basicModal: false,
            tasks: [],
            loadingTodos: true
        }
        this.toggleShow = this.toggleShow.bind(this)
    }

    backHome = () => {
        this.props.history.push(`/`)
    }

    async componentDidMount() {
        try {
            const tasksResult = await getTasks(this.props.auth.getIdToken(), "define")
            this.setState({
                tasks: tasksResult,
                loadingTodos: false
            })
        } catch (e: any) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to fetch tasks',
                text: e.message
            })
        }
    }


    async removeTask(taskId: string) {
        try {
            Swal.fire({
                title: 'Do you want to delete the task?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Deleting task...',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: async () => {
                            Swal.showLoading()
                            await deleteTask(this.props.auth.getIdToken(), taskId)
                        },
                        willClose: () => {
                            Swal.fire('Deleted!', '', 'success')
                            this.setState({
                                tasks: this.state.tasks.filter(task => task.taskId !== taskId)
                            })
                        }
                    })

                }
            })
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Deletion fail',
            })
        }
    }

    async updateStatus(taskId: string, status: string) {
        try {
            Swal.fire({
                title: 'Do you want to change status to ' + status + "?",
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Moving status...',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: async () => {
                            Swal.showLoading()
                            console.log(this.props.auth.getIdToken(), status)
                            await updateStatus(this.props.auth.getIdToken(), taskId, status)
                        },
                        willClose: async () => {
                            Swal.fire('Moved!', '', 'success')
                            const item = await getTasks(this.props.auth.getIdToken(), "define");
                            this.setState({
                                tasks: item
                            })
                        }
                    })

                }
            })
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Deletion fail',
            })
        }
    }



    toggleShow() {
        if (this.state.basicModal === true) {
            this.setState({
                basicModal: false
            })
        } else {
            this.setState({
                basicModal: true
            })
        }
    }



    renderTasksBody() {
        if (this.state.loadingTodos) {
            return this.renderLoading()
        }

        return this.renderTasks()
    }

    renderLoading() {
        return (
            <MDBCol>
                <MDBCard border={this.props.colorBorder}>
                    <MDBCardHeader ></MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardTitle></MDBCardTitle>
                        <MDBCardText>
                            <Loader indeterminate active inline="centered">
                                Loading Taks
                            </Loader>
                        </MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter background='transparent' className="justify-content-center">

                    </MDBCardFooter>
                </MDBCard>
            </MDBCol>
        )
    }

    renderTasks() {
        return (
            <>
                {this.state.tasks.map((task) => {
                    return (<MDBCol>
                        <MDBCard border={this.props.colorBorder} background='light' className='shadow-5-strong'>
                            <MDBCardHeader border={this.props.colorBorder} background='light'>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={10} verticalAlign="middle" className="mx-auto">
                                            <b style={{ fontSize: "1.25em" }}> {task.title} </b>
                                        </Grid.Column>
                                        <Grid.Column width={1} floated="right">
                                            <Button
                                                icon
                                                color="red" floated="right"
                                                onClick={() => this.removeTask(task.taskId)}
                                            >
                                                <Icon name="delete" />
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle><b style={{ fontSize: "1.75em" }}>{task.description}</b></MDBCardTitle>
                                <MDBCardText>
                                    <h5> <MDBBadge color='dark'>{task.dateCreate}</MDBBadge>  </h5>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder} className="mx-auto">
                                <Fragment>
                                    <MDBBtn color="primary" className="mx-1" onClick={() => this.toggleShow()}>Edit</MDBBtn>
                                    <MDBBtn color="secondary" className="mx-1" onClick={() => this.updateStatus(task.taskId, "inprocess")}>Inprocess</MDBBtn>
                                    <MDBBtn color="success" className="mx-1" onClick={() => this.updateStatus(task.taskId, "done")}>Done</MDBBtn>
                                </Fragment>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>)
                })
                }
            </>


        )
    }

    render() {
        return (
            <>
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {this.renderTasksBody()}
                    <MDBCol>

                        <MDBCardText style={{ padding: '0.75em 1em 1em 5.75em' }}>
                            <Button
                                icon
                                color="green"
                                className="p-5 m-4"
                                onClick={() => this.toggleShow()}
                            >
                                <Icon name="add" />
                            </Button>
                        </MDBCardText>
                    </MDBCol>
                </MDBRow>
                <MDBModal show={this.state.basicModal} setShow={this.state.basicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle><div>
                                    <h4>

                                        <MDBBadge className="mr-4" color='dark'>{new Date().toLocaleString()}</MDBBadge>
                                    </h4>
                                </div>
                                </MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody >
                                <input className='form-control mb-3' type='text' placeholder='Title of the task' />

                                <textarea className='form-control' rows={5} cols={33} placeholder='Description of the task' />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={this.toggleShow}>
                                    Close
                                </MDBBtn>
                                <MDBBtn>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </>
        )
    }
}