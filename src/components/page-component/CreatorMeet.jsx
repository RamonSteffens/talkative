import React from 'react';
import { Button } from 'react-bootstrap';
import MeetService from '../../data/meet.service';
import Input from '../input/Input';

function CreatorMeet(props) {

    const meetService = MeetService.get();

    function endMeet() {

        const meet = {
            isCreatorEnded: true,
            meetId: props.meetId
        }

        props.setIsCreatorFeedback(true)
        meetService.endMeet(meet)
    }

    return (
        <div>
            {props.isCreator && !!!props.meetUrl &&
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a id="meuElemento" rel="noopener noreferrer" href="https://meet.google.com/new" target="_blank">
                        Iniciar Reunião</a>
                    <Input placeholder="URL" type="text" name="URL do Meet:" childRef={props.refUrl} id="url" />
                    <Button onClick={() => {
                        props.shareUrl()
                        props.setIsJoined(true)
                    }}>Compartilhar</Button>
                </div>
            }
            {!!props.meetUrl &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href={props.meetUrl}>Minha reunião</a>
                </div>
            }

            {props.isJoined && <Button variant="outline-primary" style={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => {
                endMeet()
            }}>Encerrar reunião</Button>}
        </div>
    );
}

export default CreatorMeet;
