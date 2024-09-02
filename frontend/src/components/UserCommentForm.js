import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCommentForm = () => {
    // Define state for the form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]); // State for storing comments

    // Fetch all comments on component load
    useEffect(() => {
        const fetchComments = async () => {
            try {
                console.log("before making request");
                const response = await axios.get('http://localhost:5248/api/comment/getAll');
                console.log("after making request");

                setComments(response.data);
            } catch (error) {
                console.error("There was an error fetching the comments!", error);
            }
        };

        fetchComments();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            name,
            email,
            comment
        };

        try {
            const response = await axios.post('http://localhost:5248/api/comment/submit', commentData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Update the comments state to include the new comment
            setComments([commentData,...comments]);
            alert(response.data.message);
        } catch (error) {
            console.error("There was an error submitting the comment!", error);
            alert("Failed to submit comment");
        }

        // Reset the form
        setName('');
        setEmail('');
        setComment('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>

                <button type="submit" style={styles.button}>Submit</button>
            </form>

            <div style={styles.commentsSection}>
                <h3>All Comments</h3>
                {comments.length > 0 ? (
                    comments.map((c, index) => (
                        <div key={index} style={styles.commentBox}>
                            <p><strong>Name:</strong> {c.name}</p>
                            <p><strong>Email:</strong> {c.email}</p>
                            <p><strong>Comment:</strong> {c.comment}</p>
                            <p><strong>Time Added:</strong> {c.timestamp ? new Date(c.timestamp).toLocaleString() : new Date().toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    form: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        resize: 'vertical',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    commentsSection: {
        marginTop: '20px',
    },
    commentBox: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '10px',
    }
};

export default UserCommentForm;
