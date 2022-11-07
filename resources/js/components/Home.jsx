import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {
    const [authuser, setAuthuser] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/authuser").then(response => {
            setAuthuser(response.data)
        })
        axios.get("http://127.0.0.1:8000/posts").then(response => {
            setPosts(response.data)
        })
    }, [])
    

    const Deletepost = (id) => {
        axios.post("http://127.0.0.1:8000/deletepost",
        {
            "id": id
        },
        {
            headers: {
                'XCSRF-TOKEN': document.querySelector("meta[name=csrf-token]").content
            }
        }).then(response => {
            if (response.data !== '') {
                console.log(response.data)
            } else {
                document.location.reload()
            }
        })
    }

    return (
        <div className="contentcontainer">
            {
                posts.map(item => (
                    <div className="post" key={item.id}>
                        <div className="d-flex justify-content-between">
                            <div className='mb-3'>
                                <Link to={'/user/' + item.postbyid} className='link-light'>{item.postby}</Link>
                            </div>
                            {
                                authuser.map(authuseritem => {
                                    if (authuseritem.id === item.postbyid) {
                                        return (
                                            <div key={item.id}>
                                                <Button variant={"danger"} onClick={()=>Deletepost(item.id)}>X</Button>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <hr className="border-light" />
                        <div className="mb-3">
                            <h4 className="text-light">{item.header}</h4>
                        </div>
                        <div className="mb-3">
                            <Link to={'/post/' + item.id} className="link-light">Detailt</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home