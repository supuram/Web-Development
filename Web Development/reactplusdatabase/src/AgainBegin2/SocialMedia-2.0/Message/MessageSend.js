import React from "react";
import { useParams } from "react-router-dom";

export default function MessageSend() {
  const { receiverEmail, senderEmail } = useParams();

  return (
    <div>
      <p>Receiver Email: {receiverEmail}</p>
      <p>Sender Email: {senderEmail}</p>
    </div>
  );
}
