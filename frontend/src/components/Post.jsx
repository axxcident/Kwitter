import  { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components'

import React from 'react'

function Post(props) {


  return (
    <Container>
        <TopContainer></TopContainer>
        <PostContainer>{props.post}</PostContainer>
    </Container>
  )
}

export default Post


const Container = styled.div`
background-color: grey;
`

const TopContainer = styled.div`

`
const PostContainer = styled.div`

`
