import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const Post = () => {
    const { id } = useParams()
    const [authuser, setAuthuser] = useState([])
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/authuser").then(response => {
            setAuthuser(response.data)
        })
        axios.get("http://127.0.0.1:8000/postjson/" + id).then(response => {
            setPost(response.data)
        })
    })

    const Like = (id) => {
        axios.post("http://127.0.0.1:8000/likepost",
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
            }
        })
    }

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
            }
        })
    }

    return (
        <div className="contentcontainer">
            {post.length ? (
                post.map(item => (
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
                                                <Button variant={"danger"} onClick={()=> Deletepost(item.id)}>X</Button>
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
                            <b className="text-light" dangerouslySetInnerHTML={ { __html: item.title } }></b>
                        </div>
                        <div className="mb-3">
                            <Button variant={"primary"} onClick={()=> Like(item.id)}>{item.likes} Likes</Button>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-center text-light">The post does not exist.</h1>
            )
            }
        </div>
    )
}

export default Post