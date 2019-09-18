import React from 'react'

const styles = {
    card:{
        margin:10,
        padding:10,
        width: window.innerWidth/3,
        backgroundColor: '#aaa',
    }
}

const getCardWidth = () =>{
    let cardWidth = (window.innerWidth/3);
    if(window.innerWidth< 500){
        cardWidth = window.innerWidth;
    }else if (window.innerWidth<992){
        cardWidth = (window.innerWidth/2);
    }
    return Math.round(cardWidth)-40;
}

export default function StudentCard(props) {
    const { data } = props;
    const {id, name, total } = data;
    return (
        <div style={{...styles.card,width:getCardWidth()}} onClick ={() =>{
            window.location.href = "/studentDesc/"+id;
        }}>
            <div>Id: <span>{id}</span></div>
            <div>Name: <span>{name}</span></div>
            <div>Total Marks: <span>{total}</span></div>
        </div>
    )
}
