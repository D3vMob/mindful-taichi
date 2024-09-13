'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const TipTap = dynamic(() => import('./TipTap'), { ssr: false })

export default function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [postContent, setPostContent] = useState('')

  const handleNewPostClick = () => {
    setIsModalOpen(true)
  }

  const handleSavePost = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: postContent }),
      })
      if (response.ok) {
        console.log('Post saved!')
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Failed to save post:', error)
    }
  }

  return (
    <div>
      <button onClick={handleNewPostClick}>New Post</button>

      {isModalOpen && (
        <div>
          <h2>Create a New Post</h2>
          <TipTap onChange={setPostContent} />
          <button onClick={handleSavePost}>Save Post</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
