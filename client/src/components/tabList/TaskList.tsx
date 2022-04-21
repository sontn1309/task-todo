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
    }

    handleFillClick(value: string) {
        if (this.state.verticalActive === value) {
            return
        }

        this.setState({
            verticalActive: value
        })
    }

    render() {
        return (
            <>
                <MDBTabs fill className='mb-3'>
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
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => this.handleFillClick('tab3')} active={this.state.verticalActive === 'tab3'}>
                            Complete
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane show={this.state.verticalActive === 'tab1'}><TaskDefine history={this.props.history} auth={this.props.auth} colorBorder="dark" textColor="text-white"/></MDBTabsPane>
                    <MDBTabsPane show={this.state.verticalActive === 'tab2'}><TaskInprocess  history={this.props.history} auth={this.props.auth} colorBorder="dark" textColor="text-white"/></MDBTabsPane>
                    <MDBTabsPane show={this.state.verticalActive === 'tab3'}><TaskDone history={this.props.history} auth={this.props.auth} colorBorder="dark" textColor="text-white"/></MDBTabsPane>
                </MDBTabsContent>
            </>
        )
    }
}