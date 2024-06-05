import styles from '../styles/Tweet.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeLikedTweet, addLikedTweet, setLikedTweet } from '../reducers/user';


export default function Tweet(props) {
    const [likeNumber, setLikeNumber] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLiked(props.liked)
        setLikeNumber(props.likeNumber)


    }, [])



    function handleLike() {
        fetch('http://localhost:3000/tweets/like', {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: user.username,
                id: props.id,
            }),
        }).then(response => response.json())
            .then(data => console.log('Fetch tweet liked : ', data.result))
        if (isLiked) {
            dispatch(removeLikedTweet(props.id))
            setLikeNumber(likeNumber - 1)
            setIsLiked(false)
        } else {
            dispatch(addLikedTweet(props.id))
            setLikeNumber(likeNumber + 1)
            setIsLiked(true)
        }

    }

    let customStyle = { color: "white" }

    if (isLiked) {
        customStyle = { color: "red" }
    }
    const trash = props.isOwner ?
        <div className={styles.trash}>
            <FontAwesomeIcon onClick={() => props.removeTweet(props.id)} icon={faTrashCan} style={{ color: "#ffffff", }} />
        </div> : <></>

    return (
        <div className={styles.tweet} >

            <div className={styles.tweet_infos}>
                <Image className={styles.profilPic} src="/egg.jpeg"
                    height={57}
                    width={60} />
                <p className={styles.firstname}>{props.firstname}  </p>
                <p className={styles.username}>@{props.username} • {props.date} </p>
            </div>

            <div className={styles.tweetContent}>
                <p >{props.tweet}</p>
            </div>

            <div className={styles.iconContainer}>


                <div className={styles.heart}  >
                    <FontAwesomeIcon onClick={() => handleLike()}
                        icon={faHeart}
                        style={customStyle}
                        className={styles.heart} />
                </div>
                <div className={styles.likeCounter}>
                    <p style={customStyle} >{likeNumber}</p>
                </div>

                <div className={styles.trash}>
                    {trash}
                </div>

            </div>

        </div>

    )
}







