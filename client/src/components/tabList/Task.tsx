import React from 'react';
import { MDBCard, MDBCardHeader, MDBCardFooter, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
export interface TaskProps {
    colorBorder: string
    textColor: string
}

export interface TaskState {
}

export class Task extends React.PureComponent<TaskProps, TaskState> {
    constructor(props: TaskProps) {
        super(props)
    }

    render() {
        return (
            <>
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}>
                            Create US789425</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Create US789425</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard border={this.props.colorBorder}>
                            <MDBCardHeader background={this.props.colorBorder} className={this.props.textColor} border={this.props.colorBorder}> Header</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border={this.props.colorBorder}>
                                Footer
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </>
        )
    }
}