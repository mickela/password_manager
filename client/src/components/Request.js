// import React from 'react';

export function Post (url, data){
    fetch(url, {
        method: 'POST',
        headers: new Headers(),
        body: data
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        return data;
    })
    .catch(err => console.log(err))
}

export function Get(url){
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        return data;
    })
    .catch(err => console.log(err))
}

// learn more about higher-order functions