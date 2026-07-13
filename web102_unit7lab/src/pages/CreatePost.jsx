import { useState } from 'react'
import './CreatePost.css'
import {supabase} from '../client.js'

const CreatePost = () => {
    const [post, setPost] = useState({title: "", author: "", description: ""})

    const createPost = async (event) => {
        event.preventDefault()
        const { error } = await supabase
            .from('Post')
            .insert({
                Title: post.title,
                Author: post.author,
                Description: post.description,
            })

        if (error) {
            console.error('Error creating post:', error)
        }
    }
    

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            } 
        })
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                <br/>
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost;