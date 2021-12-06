import React from 'react'
//날짜별로 나눠야함

export default function InterestPost({ post, handleClick }: any) {
    console.log('post내용:',post)
    //맵으로 우선 카테고리 만들기(컴포넌트 만들고 그안에 내용물 넣는거)-> 그리고 다시 맵으로 내용물 넣기
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

