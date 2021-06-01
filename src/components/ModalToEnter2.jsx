import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import MeetService from '../data/meet.service';
import CreatorMeet from './page-component/CreatorMeet';
import PartnerMeet from './page-component/PartnerMeet';


function ModalToEnter2(props) {
    const meetService = MeetService.get();
    const [isJoined, setIsJoined] = useState(false)

    function shareUrl(params) {
        const url = props.refUrl.current.value
    
        const meet = {
          meetUrl: url,
          meetId: props.meetId
        }
        props.setMeetUrl(url)
        meetService.meetUpdate(meet)
      }

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Ingresse na Conversação
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <CreatorMeet
                    isCreator={props.isCreator}
                    meetUrl={props.meetUrl}
                    refUrl={props.refUrl}
                    isJoined={isJoined}
                    shareUrl={shareUrl}
                    setIsJoined={setIsJoined}
                    meetId={props.meetId}
                    setIsCreatorFeedback={props.setIsCreatorFeedback}
                  />
                  {!!props.meetUrl && !isJoined &&
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h5>Aguardando participantes...</h5>
                    </div>
                  }
                  <PartnerMeet
                    isCreator={props.isCreator}
                    partnerUrl={props.partnerUrl}
                    joinMeet={props.joinMeet}
                    meetId={props.meetId}
                    setIsPartnerFeedback={props.setIsPartnerFeedback}
                  />
                </Form.Group>
              </Form>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { props.closeToEnterModal() }}>Fechar</Button>
          </Modal.Footer>
        </Modal >
      );
}

export default ModalToEnter2;
