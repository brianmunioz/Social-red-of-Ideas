import React, { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading'
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import logout from '../../helpers/logout';
const MyAccount = () => {
    const token = document.cookie.replace('token=', '');
    const user = JSON.parse(localStorage.getItem('user'));
    const [userData, setUserData] = useState('');
    const [userStats, setUserStats] = useState('');
    const min = 20;
    const { REACT_APP_API_URL } = process.env;

    useEffect(() => {
        if (!token || !user) logout();
    }, []);
    useEffect(() => {
        axios.get(`${REACT_APP_API_URL}user/${user}`)
            .then((response) => {
                const data = {
                    username: response.data.username,
                    name: response.data.name
                }
                setUserData(data);
            })
            .catch(console.log)
    }, []);
    useEffect(() => {
        axios.get(`${REACT_APP_API_URL}idea/?pageSize=1000`)
            .then((response) => {
                const ideasTotal = response.data.filter(idea => { return idea.author._id === user }).length;
                let positiveVoted = 0;
                let negativeVoted = 0;
                let ideasKarma = 0;
                let commentedIdeas = 0;
                response.data.forEach((el) => {
                    if (el.author._id === user) {
                        if (el.vote.length > 0) {
                            el.vote.forEach(vote => {
                                if (vote.vote === true) {
                                    ideasKarma += 1;
                                } else {
                                    ideasKarma -= 1;
                                }
                            })
                        }
                    }
                    const positiveUserVoted = el.vote.filter((el) => { return el.author._id === user && el.vote === true }).length;
                    const negativeUserVoted = el.vote.filter((el) => { return el.author._id === user && el.vote === false }).length;
                    const commentedUserIdea = el.comments.filter((el) => { return el.author._id === user }).length;
                    positiveVoted += positiveUserVoted;
                    negativeVoted += negativeUserVoted;
                    commentedIdeas += commentedUserIdea;
                });
                const stats = {
                    ideasTotal,
                    positiveVoted,
                    negativeVoted,
                    ideasKarma,
                    commentedIdeas
                }
                setUserStats(stats);
            })
            .catch(console.log)
    }, [userData !== '']);
    const userType = () => {
        if (userStats.ideasTotal === 0 &&
            userStats.ideasKarma === 0 &&
            userStats.positiveVoted + userStats.negativeVoted === 0) {
            return <>
                <img src="https://img.icons8.com/emoji/48/null/sloth-emoji.png" alt="user" />
                <p >You are a Lazy user</p>
            </>
        } else if (userStats.ideasTotal > 0 &&
            userStats.ideasKarma > 0 &&
            userStats.positiveVoted > userStats.negativeVoted &&
            userStats.commentedIdeas > 0) {
            return <>
                <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/48/null/external-man-avatar-and-emotion-justicon-lineal-color-justicon-5.png" alt="user" />
                <p>You are a cool user</p>
            </>
        }
        else if (userStats.positiveVoted + userStats.negativeVoted === 0 &&
            userStats.ideasKarma === 0 &&
            userStats.commentedIdeas > 0) {
            return <>
                <img src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/48/null/external-talk-blogger-and-influencer-xnimrodx-lineal-color-xnimrodx.png" alt="user" />
                <p>you are a user who likes to talk a lot</p>
            </>
        } else if (userStats.positiveVoted + userStats.negativeVoted > 0 &&
            userStats.ideasKarma === 0 &&
            userStats.commentedIdeas === 0) {
            return <>
                <img src="https://img.icons8.com/office/48/null/court-judge.png" alt="user" />
                <p>You are a judge of this community</p>
            </>
        }
        else if (userStats.positiveVoted - userStats.negativeVoted < 0 &&
            userStats.ideasKarma === 0) {
            return <>
                <img src="https://img.icons8.com/external-dreamcreateicons-flat-dreamcreateicons/48/null/external-devil-halloween-dreamcreateicons-flat-dreamcreateicons.png" alt="user" />
                <p >You are a hater user</p>
            </>

        } else if (userStats.ideasKarma < 0) {
            return <>
                <img src="https://img.icons8.com/external-microdots-premium-microdot-graphic/48/null/external-protest-human-civilization-vol1-microdots-premium-microdot-graphic.png" alt="user" />
                <p>You are a hated user than justin bieber </p>
            </>
        } else if (userStats.negativeVoted > userStats.positiveVoted && userStats.ideasKarma < 0) {
            return <>
                <img src="https://img.icons8.com/external-bearicons-outline-color-bearicons/48/null/external-Review-customer-review-bearicons-outline-color-bearicons-9.png" alt="user" />
                <p>This is your passport from grumpy user</p>
            </>
        } else if (userStats.ideasTotal === 0 &&
            userStats.positiveVoted + userStats.negativeVoted >= min &&
            userStats.positiveVoted >= userStats.negativeVoted) {
            return <>
                <img src="https://img.icons8.com/external-kosonicon-outline-color-kosonicon/48/null/external-voting-vote-kosonicon-outline-color-kosonicon.png" alt="user" />
                <p>You are a dark room user</p>
            </>
        } else if (userStats.ideasTotal === 0 &&
            userStats.positiveVoted + userStats.negativeVoted === 0 &&
            userStats.commentedIdeas > 0) {
            return <>
                <img src="https://img.icons8.com/external-kosonicon-outline-color-kosonicon/48/null/external-voting-vote-kosonicon-outline-color-kosonicon.png" alt="user" />
                <p>You are a dark room user</p>
            </>
        } else {
            return <>
                <img src="https://img.icons8.com/stickers/48/null/human-head.png" alt="user" />
                <p >You are a normal user</p>
            </>
        }
    }
    return (
        <div className='container'>
            {
                userData && userStats ?

                    <div className=" mt-5 col-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 header user-profile">
                                    <div className="card-block text-center text-white">
                                        <p style={{ fontSize: '40px' }} className="mb-5"><span className='text-white-50'>@</span>{userData.username}</p>
                                        {userType()}
                                    </div>
                                </div>
                                <div className="col-sm-8 bg-opacity-25">
                                    <div className="card-block bg-opacity-25">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">name</p>
                                                <h6 className="f-w-600 text-muted ">{userData.name}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Ideas</p>
                                                <h6 className="f-w-600 text-muted ">{userStats.ideasTotal}</h6>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Stats</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Positive voted</p>
                                                <h6 className="text-success bold f-w-400"> {userStats.positiveVoted}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Negative voted</p>
                                                <h6 className="text-danger bold f-w-400">{userStats.negativeVoted}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Ideas Karma</p>
                                                <h6 className="text-muted f-w-400">{userStats.ideasKarma}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">{""}</h6>
                                                <Link to="/myaccount/config" style={{ fontSize: '20px' }} className='text-dark text-decoration-none  bold'><img style={{ width: '40px' }} src="https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/null/external-configuration-user-interface-creatype-filed-outline-colourcreatype.png" alt='config' /> Settings </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
                    <Loading></Loading>
            }
        </div>
    )
}

export default MyAccount