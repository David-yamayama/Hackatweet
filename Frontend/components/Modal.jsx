import Modal from "react-modal";
import styles from "../styles/Modal.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser, logInUser } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";




const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#141D27",
        color: "#FFFFFF",
    },
};

export default function ModalLogin(props) {
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");



    let subtitle;

    //function afterOpenModal() {
    //     subtitle.style.color = "#FFFFFF";
    // }

    const handleSignUp = () => {
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: firstname,
                username: signUpUsername,
                password: signUpPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('LOGUP', data)
                if (data.result) {
                    console.log(data)
                    dispatch(
                        signUpUser({
                            firstname: firstname,
                            username: signUpUsername,
                            token: data.token,


                        })
                    );
                    setFirstname("");
                    setSignUpUsername("");
                    setSignUpPassword("");

                }
            });
    };

    const handleSignIn = () => {
        fetch("http://localhost:3000/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: signInUsername,
                password: signInPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("SIGNIN", data);
                if (data.result) {
                    console.log('LOGIN', data)
                    dispatch(
                        logInUser({
                            firstname: data.user.firstname,
                            username: signInUsername,
                            token: data.user.token,
                            likedTweets: data.user.likedTweets,

                        })
                    );
                    setSignInUsername("");
                    setSignInPassword("");

                }
            });
    };



    if (!props.isSignin) {
        return (
            <div className={styles.div_container}>
                <Modal
                    isOpen={props.modalIsOpen}

                    onRequestClose={props.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className={styles.top_div}>
                        <FontAwesomeIcon icon={faXmark}
                            size='40px'
                            color='white'
                            onClick={props.closeModal}
                            className={styles.close_modal} />
                    </div>
                    <div className={styles.div_logo}>
                        <img
                            className={styles.logo_right}
                            src="/logo_twitter.webp"
                            alt="logo twitter"
                        />
                    </div>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)} className={styles.h2}>
                        Create your Hackatweet account
                    </h2>
                    <div className={styles.form}>
                        <input
                            className={styles.input}
                            placeholder="Firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                        />
                        <input
                            className={styles.input}
                            placeholder="Username"
                            onChange={(e) => setSignUpUsername(e.target.value)}
                            value={signUpUsername}
                        />
                        <input
                            className={styles.input}
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            value={signUpPassword}
                        />
                        <button
                            className={styles.btn_signup}
                            onClick={() => handleSignUp()}
                        >
                            Sign up
                        </button>
                    </div>
                </Modal>
            </div>
        );
    } else {
        return (
            <div className={styles.div_container}>
                <Modal
                    isOpen={props.modalIsOpen}
                    onRequestClose={props.closeModal}
                    style={customStyles}
                >
                    <div className={styles.top_div}>
                        <FontAwesomeIcon icon={faXmark}
                            size='40px'
                            color='white'
                            onClick={props.closeModal}
                        />

                    </div>
                    <div className={styles.div_logo}>
                        <img
                            className={styles.logo_right}
                            src="logo_twitter.webp"
                            alt="logo twitter"
                        />
                    </div>
                    <h2 className={styles.h2}>
                        Connect to Hackatweet
                    </h2>
                    <div className={styles.form}>
                        <input
                            className={styles.input}
                            placeholder="Username"
                            onChange={(e) => setSignInUsername(e.target.value)}
                            value={signInUsername}
                        />
                        <input
                            className={styles.input}
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setSignInPassword(e.target.value)}
                            value={signInPassword}
                        />
                        <button className={styles.btn_signup} onClick={() => handleSignIn()}>
                            Sign in
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

