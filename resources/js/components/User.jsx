import axios from 'axios'
import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const User = () => {
    const { id } = useParams()
    const [authuser, setAuthuser] = useState([])
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/userjson/" + id).then(response => {
            setUser(response.data)
        })
        axios.get("http://127.0.0.1:8000/userpostsjson/" + id).then(response => {
            setPosts(response.data)
        })
        axios.get("http://127.0.0.1:8000/authuser").then(response => {
            setAuthuser(response.data)
        })
    }, [])

    const Delete = (id) => {
        axios.post("http://127.0.0.1:8000/deletepost", {
            "id": id,
            "postbyid": authuser[0].id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'XCSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                }
            }).then(response => {
                if (response.data !== '') {
                    alert(response.data)
                } else {
                    document.location.reload()
                }
            })
    }

    return (
        <div className="contentcontainer">
            {user.length ? (
                <>
                    {user.map(item => (
                        <div className="mb-3" key={item.id}>
                            <h1 className="text-center text-light">{item.name} {item.surname}</h1>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <h1 className="text-center text-light">The user does not exist.</h1>
                </>
            )}
            <hr className="border-light" />
            {posts.length ? (
                <>
                    {posts.map(item => (
                        <div className="post" key={item.id}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Link className='link-light' to={'/user/' + item.postbyid}>{item.postby}</Link>
                                </div>
                                {
                                    authuser.map(authuseritem => {
                                        if (item.postbyid === authuseritem.id) {
                                            return (
                                                <div key={item.id}>
                                                    <Button variant="danger" onClick={() => Delete(item.id)}>X</Button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <hr className='border-light' />
                            <div className='mb-3'>
                                <b className="text-light">{item.header}</b>
                            </div>
                            <div className="mb-3">
                                <Link to={'/post/' + item.id} className="link-light">Details</Link>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <h1 className="text-center text-light">The posts do not exist.</h1>
            )}
        </div>
    )
}

export default User