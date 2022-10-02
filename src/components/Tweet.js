import { dbService } from "fbase";
import {useState} from "react"; 

const Tweet =  ({tweetObj, isOwner}) => {

    const [editing, setEditing] = useState(false); 
    const [newTweet, setNewTweet] = useState(tweetObj.text); 
    
     const onDeleteClick = async () => {
        const ok = window.confirm("Do you want to delete tweet?"); 
        console.log(ok); 

        if (ok) {
            console.log(tweetObj.id); 
            const data = await dbService.doc(`tweets/${tweetObj.id}`).delete(); 
            console.log(data); 
        }
    }; 

    const toggleEditing = () => setEditing((prev) => !prev); 

    const onChange = (event) => {
        const {
            target: {value}, 
        } = event; 
        setNewTweet(value); 
    }; 

    const onSubmit = async (event) => {
        event.preventDefault(); 
        await dbService.doc(`tweets/${tweetObj.id}`).update({text: newTweet}); 
        setEditing(false); 
    }

    return (
        <div> 
            {editing ? (
                <> 
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newTweet} required /> 
                        <input type="submit" value="Update Tweet" /> 
                    </form>
                    <button onClick={toggleEditing}>Cancle</button>
                </>
            ) : (
                <> 
                    <h4>{tweetObj.text}</h4>
                    {isOwner && (
                        <>
                        <button onClick={onDeleteClick}>Delete Tweet</button>
                        <button onClick={toggleEditing}>Edit Tweet</button> 
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export  default Tweet; 