import React from 'react'

export default function Card({id, name, email}) {
  return (
    <div>
        <div>{id}</div>
        <div>{name}</div>
        <div>{email}</div>
    </div>
  );
}
