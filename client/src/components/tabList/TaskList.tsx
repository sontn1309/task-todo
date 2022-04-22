import React from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { TaskDefine } from './TaskDefine'
import { TaskDone } from './TaskDone'
import { TaskInprocess } from './TaskInprocess'
import Auth from '../../auth/Auth'
import { History } from 'history'

export interface TaskListProps {
    auth: Auth
    history: History
}

export interface TaskListState {
    verticalActive: string
}

export class TaskList extends React.PureComponent<TaskListProps, TaskListState> {
    constructor(props: TaskListProps) {
        super(props)
        this.state = {
            verticalActive: "tab1"
        }
        this.backHome = this.backHome.bind(this)
    }

    handleFillClick(value: string) {
        if (this.state.verticalActive === value) {
            return 
        }

        this.setState({
            verticalActive: value
        })
    }

    handleRender(value: string) {
        if (value === "tab1") {
            return  <MDBTabsPane show={this.state.verticalActive === 'tab1'}><TaskDefine {...this.props} auth={this.props.auth} colorBorder="dark" textColor="text-white"/></MDBTabsPane>
        }

        if (value === "tab2") {
            return  <MDBTabsPane show={this.state.verticalActive === 'tab2'}><TaskInprocess {...this.props} auth={this.props.auth} colorBorder="dark" textColor="text-white"/></MDBTabsPane>
        }
        if (value === "tab3") {
            return  <MDBTabsPane show={this.state.verticalActive === 'tab3'}><TaskDone {...this.props} auth={this.props.auth} colorBorder="dark" textColor="text-white"/></MDBTabsPane>
        }
    }
    
    backHome() {
      this.props.history.push("/")
    }


    render() {
        return (
            <>
                <MDBTabs pills justify  className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => this.handleFillClick('tab1')} active={this.state.verticalActive === 'tab1'}>
                            Define
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => this.handleFillClick('tab2')} active={this.state.verticalActive === 'tab2'}>
                            Inprocess
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem border='dark'>
                        <MDBTabsLink onClick={() => this.handleFillClick('tab3')} active={this.state.verticalActive === 'tab3'}>
                             Complete
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    {this.handleRender(this.state.verticalActive)}
                </MDBTabsContent>
            </>
        )
    }
}