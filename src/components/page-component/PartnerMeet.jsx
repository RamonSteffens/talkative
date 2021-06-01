import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MeetService from '../../data/meet.service';

function PartnerMeet(props) {
    const [isJoined, setIsJoined] = useState(false)
    const meetService = MeetService.get();

    function endMeet() {

        const meet = {
            isPartnerEnded: true,
            meetId: props.meetId
        }
        props.setIsPartnerFeedback(true)
        meetService.endMeet(meet)
    }


    return (
        <div>
            {!props.isCreator && !isJoined &&
                <><Button variant="outline-primary" onClick={() => {
                    props.joinMeet()
                }}>Obter Link</Button><p />
                    {!!props.partnerUrl &&
                        <a id="meuElemento2" rel="noopener noreferrer" href={props.partnerUrl} target="_blank" onClick={() => { setIsJoined(true) }}>
                            Entrar na Reunião</a>
                    }
                </>}
            {isJoined && <Button variant="outline-primary" onClick={() => {
                endMeet()
            }}>Encerrar reunião</Button>}
        </div>
    );
}

export default PartnerMeet;
