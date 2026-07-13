import { useState, useEffect } from 'react'
import Card from '../components/Card'
import {supabase} from '../client.js'

const ReadPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Post')
                .select()
                .order('created_at', { ascending: true })

            if (error) {
                console.error('Error fetching posts:', error)
                return
            }

            setPosts(data ?? [])
        }

        fetchPosts()
    }, [])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.Title}
                        author={post.Author}
                        description={post.Description}
                    />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts