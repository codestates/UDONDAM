import React from 'react'
//날짜별로 나눠야함

export default function InterestPost({ post, handleClick }: any) {
    return (
        <div>
            {post.map((post: { id: any, createAt: any, content: any }) => {
                return (
                    <div>
                        <div key={post.id} className='interest_posts'>
                            <div className='interest_posts_post' onClick={(e) => handleClick(e, post.id)}>
                                <div className='interest_posts_createAt'>{post.createAt}</div>
                                <div className='interest_posts_post'>{post.content}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>



    )
}

