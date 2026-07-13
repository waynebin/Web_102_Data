import {useState} from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'
import {supabase} from '../client.js'

const EditPost = () => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""})

    const updatePost = async (event) => {
        event.preventDefault()

        const { error } = await supabase
            .from('Post')
            .update({
                Title: post.title,
                Author: post.author,
                Description: post.description,
            })
            .eq('id', id)
            window.location = '/'

        if (error) {
            console.error('Error updating post:', error)
        }
    }

    const deletePost = async (event) => {
        event.preventDefault()
        const { error } = await supabase
            .from('Post')
            .delete()
            .eq('id', id)
            window.location = '/'
        if (error) {
            console.error('Error deleting post:', error)
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
            <form onSubmit={updatePost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost} />
                <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost