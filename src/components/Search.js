import React, { useContext, useState } from 'react'
import { collection, query, where ,getDocs,getDoc, setDoc, updateDoc, doc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from '../context/AuthContext';
const Search = () => {

  const [username,setUsername]=useState("")
  const [user,setUser]=useState(null)
  const [err,setErr]=useState(false)

  const {currentUser}=useContext(AuthContext)

  const handleSearch=async ()=>{      {/* search for query in firebase */}
      const q = query(collection(db,"users"),where("displayName","==",username));

      try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(err){
      setErr(true);
    }
  };

  const handleKey=e=>{
    e.code==="Enter" && handleSearch();
  }

  const handleSelect= async()=>{
      //check whether the group(chats collection in fire store) exist,if not create new one by combining the id of the 2 users
      const combinedId=currentUser.uid>user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid ;
      try{
      const res = await getDoc(doc(db,"chats",combinedId));

        if(!res.exists()){
          //create a chat in chats collection
          await setDoc(doc(db,"chats",combinedId),{messages:[]})

          //create user chats
          await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combinedId+".userInfo"]:{
              uid:user.uid,
              displayName:user.displayName,
              photoURL:user.photoURL
            },
            [combinedId+".date"]:serverTimestamp()
          });
          await updateDoc(doc(db,"userChats",user.uid),{
            [combinedId+".userInfo"]:{
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL
            },
            [combinedId+".date"]:serverTimestamp()
          });
        }

      }catch(err){
        setErr(true)
      }

      //ta baad l click aal search yruh l dropdown
      setUser(null);
      setUsername("")
  }

  return (
    <div className='search'>
      <div className='searchform'>
         <input type="text" placeholder='find a user...'
          onChange={e=>setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}/>
      </div>
      {err && <span>User not found!</span>}
      {/* handleselect ta tsir l search clickable */}
      {user && <div className='userChat' onClick={handleSelect}> 
      <img src={user.photoURL} alt=""/>      
      <div className='userChatInfo'>
        <span>{user.displayName}</span>
      </div>
      </div>}
    </div>
    
  )
}


export default Search
