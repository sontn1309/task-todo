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
} from 'mdb-react-ui-kit';
import {
    Button,
    Grid,
    Icon,
    Loader
} from 'semantic-ui-react'
import Swal from 'sweetalert2'
import { getTasks, deleteTask } from '../../api/tasks-api'
import Auth from '../../auth/Auth'
import { TaskModel } from '../../types/Task'

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

export class TaskDone extends React.PureComponent<TaskProps, TaskState> {
    constructor(props: TaskProps) {
        super(props)
        this.state = {
            basicModal: false,
            tasks: [],
            loadingTodos: true
        }
        this.toggleShow = this.toggleShow.bind(this)
    }
    async componentDidMount() {
        try {
            const tasksResult = await getTasks(this.props.auth.getIdToken(), "done")
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
    renderTasks() {
        return (
            <>
                {this.state.tasks.map((task) => {
                    return (<MDBCol>
                        <MDBCard border={this.props.colorBorder} background='light' className='shadow-5-strong'>
                            <MDBCardHeader border={this.props.colorBorder}  background='light'>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={10} verticalAlign="middle" className="mx-auto">
                                            <b style={{ fontSize: "1.5em" }}> {task.dateCreate} </b>
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
                                <MDBCardTitle>{task.title}</MDBCardTitle>
                                <MDBCardText>
                                    {task.description}
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder} className="mx-auto">
                                <Fragment>
                                    <MDBBtn color="primary" className="mx-1" onClick={() => this.toggleShow()}>Edit</MDBBtn>
                                    <MDBBtn color="danger" className="mx-1">Define</MDBBtn>
                                    <MDBBtn color="secondary" className="mx-1">Inprocess</MDBBtn>
                                </Fragment>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>)
                })
                }
            </>
        )
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

    render() {
        return (
            <>
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {this.renderTasksBody()}
                </MDBRow>
                <MDBModal show={this.state.basicModal} setShow={this.state.basicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Edit/Create Task</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={this.toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>...</MDBModalBody>

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