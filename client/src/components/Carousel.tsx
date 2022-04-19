import React from 'react';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption,
} from 'mdb-react-ui-kit';

export interface CarouselProps {
}

export interface CarouselState {
}

export class Carousel extends React.PureComponent<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props)
    }
    render() {
        return (
            <MDBCarousel showIndicators showControls fade>
                <MDBCarouselInner>
                    <MDBCarouselItem className='active'>
                        <MDBCarouselElement src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp' alt='...' />
                        <MDBCarouselCaption>
                            <h5>Task manager</h5>
                            <p>Create the task. Control the work. Login to start</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem>
                        <MDBCarouselElement src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp' alt='...' />
                        <MDBCarouselCaption>
                            <h5>Manage your work</h5>
                            <p>Control you work.Login to start</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem>
                        <MDBCarouselElement src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp' alt='...' />
                        <MDBCarouselCaption>
                            <h5>Manage your time</h5>
                            <p>Your plan. Login to start</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        );
    }
}