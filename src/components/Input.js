import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import Send from "../img/send.png"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db,storage } from '../firebase'
import { v4 as uuid } from 'uuid'

const Input = () => {
  const [text,setText]=useState("");
  const [img,setImg]=useState(null);

  const{currentUser}=useContext(AuthContext);
  const{data}=useContext(ChatContext);

  const handleSend=async()=>{
    //here we search for update array in docs
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on( 
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages:arrayUnion({
                id: uuid(), //because we gonna use it b he <Message message={m} key={m.id}/> in messages
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL,
              }),
            });
          });
      }
  );
    
    }else{//send the messages
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id: uuid(), //because we gonna use it b he <Message message={m} key={m.id}/> in messages
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        }),
      });
    }
    // ta a3ml update lal chats bl side bar
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });
//for other user
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });
  ////halae lezm ruh zabt bl chats ta ybayn last mesg bl side bar
  ////<p>{chat[1].userInfo.lastMessage?.text}</p>--->saret hek---><p>{chat[1].lastMessage?.text}</p>


    setText("")
    setImg(null)
  };
  return (
    <div className='input'>
      <input type="text" placeholder='Type Something...'  
      onChange={e=>setText(e.target.value)}
      value={text} // to delet the input text
      />
      <div className='send'>
        <img src={Attach} alt=""/>
        <input type="file" style={{display:"none"}} id="file"  onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src={Img} alt=""/>
        </label>
        <button onClick={handleSend}>
          <img src={Send} alt=''/>
        </button>
      </div>
    </div>
  )
}

export default Input
