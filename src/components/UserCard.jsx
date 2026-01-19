import React from 'react'

const UserCard = ({user}) => {
  return (
    <div>
        <div className="flex justify-center my-10 card bg-base-200 w-96 h-120 shadow-sm">
            <figure>
                <img
                src={user?.profileUrl}
                alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user?.firstName+ " " +user?.lastName}</h2>
                {user?.age && user?.gender&& <p>{user?.age + ", " + user?.gender}</p>}
                <p>{user?.about}</p>
                <div className="card-actions justify-center my-5">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard