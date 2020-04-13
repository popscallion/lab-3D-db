import React, {lazy, Suspense, useContext, useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import { Button, Link, Box, Flex, Image } from 'rebass/styled-components'
import { SetIdContext, IdContext, NodeContext, SetHoverContext } from '../Viewer'
import { throttle, debounce } from "lodash";
import Markdown from 'markdown-to-jsx'
import data from '../data/allLists'




const Info = ({show, handler}) => {
  const specimen = useContext(IdContext)
  const setSpecimen = useContext(SetIdContext)
  const node = useContext(NodeContext)
  const setHover = useContext(SetHoverContext)
  const debounceHandler = debounce(handler, 500, {'leading':false})
  const [debounceState, setDebounceState] = useState(null)
  useEffect(()=>{
    // console.log("debouncing to: "+debounceState);
    debounceHandler(debounceState)
  },[debounceState])


  const LinkCatcher=(props)=>{
    return(
      <span onMouseEnter={()=>{setDebounceState(true);setHover(props.href.replace('#',''))}} onMouseLeave={()=>{setDebounceState(false)}}>
        <Link sx={{color:'blue'}}
        onClick={()=> {setSpecimen(props.href.replace('#','')); console.log(specimen)}}
        style={{fontWeight:'bold', cursor:'pointer'}} >{props.children}</Link>
      </span>
    )
  }

  const components = {
    a:LinkCatcher
  }

  const Content = data.content[node].md
  return useMemo (()=> {
    return (
      <Markdown options={{overrides:{a:{component:LinkCatcher}}}}>
        {Content}
      </Markdown>
      )
    }, [node])
}
export default Info;
