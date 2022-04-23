import { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { Carousel } from './components/Carousel'
import { TaskList } from './components/tabList/TaskList'
import { NotFound } from './components/NotFound'
import { Headder } from './components/Headder'
import { Footer } from './components/Footer'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

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
        <Segment style={{ padding: '0em 0em 12em 0em'}} vertical>
          <Router history={this.props.history}>
            <Route
              render={props => {
                return <Headder auth={this.props.auth}  {...props}/>
              }}
            />
            <Grid container stackable verticalAlign="middle" style={{ padding: '3em 0em 3em 0em'}}>
              <Grid.Row>
                <Grid.Column width={16}>
                  {this.generateCurrentPage()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Router>
        </Segment>
        <Footer></Footer>
      </div>
    )
  }
  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <Carousel />
    }
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <TaskList {...props} auth={this.props.auth}/>
          }}
        />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
