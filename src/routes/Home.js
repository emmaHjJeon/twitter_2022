import { useEffect, useState } from "react"; 
import { dbService } from "fbase";

const Home = ({userObj}) => {
    console.log(userObj); 
    const [tweet, setTweet] = useState(""); 
    const [tweets, setTweets] = useState([]); 

    useEffect(() => {
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id, 
                ...document.data(), 
            })); 
            setTweet(newArray); 
        }); 
    }, []); 

    const onSubmit = async (event) => {
        event.preventDefault(); 

        await dbService.collection("tweets").add({
            text: tweet, 
            createdAt: Date.now(), 
            createdId: userObj.uid,
        }); 

        setTweet(""); 
    }; 

    const onChange = (event) => {
        event.preventDefault(); 
        
        const {
            target : { value }, 
        } = event; 

        setTweet(value); 
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    value={tweet}
                    onChange={onChange} 
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                /> 
                <input type="submit" value="Tweet" /> 
            </form>
            <div> 
                {tweets.map((tweet) => (
                    <div key={tweet.id}> 
                        <h4>{tweet.text}</h4> 
                    </div>
                ))}
            </div>
        </>
    );
}; 

export default Home; 