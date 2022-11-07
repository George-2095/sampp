import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const Newpost = () => {
    const [image, setImage] = useState('')
    const [imageerror, setImageerror] = useState('')
    const [header, setHeader] = useState('')
    const [headererror, setHeadererror] = useState('')
    const [title, setTitle] = useState('')
    const [titleerror, setTitleerror] = useState('')

    const Submit = (() => {
        if (image.files.length === 0 || header === '' || title === '') {
            if (image.files.length === 0) {
                setImageerror("Image upload is required")
            } else {
                setImageerror('')
            }
            if (header === '') {
                setHeadererror('Fill in this field is required')
            } else {
                setHeader('')
            }
            if (title === '') {
                setTitleerror('Fill in this field is required')
            } else {
                setTitleerror('')
            }
        } else {
            setHeadererror('')
            setTitleerror('')
            axios.post('http://127.0.0.1:8000/makepost',
                {
                    header: header,
                    title: title
                },
                {
                    headers: {
                        'XCSRF-TOKEN': document.querySelector("meta[name=csrf-token]").content
                    }
                }).then(response => {
                    if (response.data !== '') {
                        console.log(response.data)
                    } else {
                        document.location.href = './'
                    }
                })
        }
    })
    return (
        <div className="contentcontainer">
            <Form.Group>
                <Form.Label className="text-light">Image</Form.Label>
                <input type="file" name="image[]" id="image" className='form-control' value={image} onchange={(e) => (e.target.files)} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label className='text-light'>Header</Form.Label>
                <textarea rows="5" className="form-control" value={header} onChange={(e) => setHeader(e.target.value)}></textarea>
                <b className='text-light'>{headererror}</b>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label className='text-light'>Title</Form.Label>
                <textarea rows="10" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                <b className='text-light'>{titleerror}</b>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Button variant='secondary' onClick={() => Submit()}>Submit</Button>
            </Form.Group>
        </div>
    )
}

export default Newpost