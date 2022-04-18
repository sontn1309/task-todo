import { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { EditTodo } from './components/EditTodo'
import { NotFound } from './components/NotFound'
import { Todos } from './components/Todos'
import { Headder } from './components/Headder'
import 'bootstrap/dist/css/bootstrap.min.css';

export interface AppProps { }

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState { }

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
  }
  render() {
    return (
      <div>
        <Segment style={{ padding: '0em 0em 5em 0em' }} vertical>
          <Router history={this.props.history}>
            <Route
              render={props => {
                return <Headder auth={this.props.auth}  {...props}/>
              }}
            />
            <Grid container stackable verticalAlign="middle" style={{ padding: '3em 0em 3em 0em' }}>
              <Grid.Row>
                <Grid.Column width={16}>
                  {this.generateCurrentPage()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Router>
        </Segment>
      </div>
    )
  }
  generateCurrentPage() {
    console.log("1")
    if (!this.props.auth.isAuthenticated()) {
      return <Grid.Column width={16}></Grid.Column>
    }
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <Todos {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/todos/:todoId/edit"
          exact
          render={props => {
            return <EditTodo {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
