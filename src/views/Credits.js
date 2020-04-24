import React, { useState, useEffect } from 'react'
import {Box, Flex, Text, Image} from 'rebass/styled-components';
import styled from 'styled-components'
import Infosvg from "../assets/info.svg"

const CreditsFlex = styled(Flex)`
  flex-direction: row;
  height: 120px;
  align-items: center;
`

const CreditsText = props =>
    <Text
      {...props}
      sx={{
        margin: '0px 8px',
        fontFamily: 'Cabin',
        fontSize: '11px',
        color: 'ochre',
        '> strong':{
          fontSize: '10px',
          letterSpacing: '0.25px',
          textTransform: 'uppercase',
          color: 'blue'
        }
      }}
    />



const TextFlex = styled(Flex)`
  flex-direction: column;
`

const CreditsIcon = props =>
  <Image
    {...props}
    sx={{
      width: '20px',
      height: '20px',
      cursor:'pointer'
    }}
  />


export default function Credits(props){
  const {instructor, text, development} = props.data.people
  const support = props.data.support
  const [hover, setHover] = useState(false)
  return (
    <CreditsFlex>
      <CreditsIcon
        src={Infosvg}
        onMouseEnter={()=>{setHover(true)}}
        onMouseLeave={()=>{setHover(false)}} />
      {hover
        ? <TextFlex><CreditsText><strong>Instructor:{'\u00A0'}{'\u00A0'}</strong>{instructor}</CreditsText>
        <CreditsText><strong>Original text:{'\u00A0'}{'\u00A0'}</strong>{text}</CreditsText>
        <CreditsText><strong>Development:{'\u00A0'}{'\u00A0'}</strong>{development}</CreditsText>
        <CreditsText><strong>Supported by:{'\u00A0'}{'\u00A0'}</strong>{support}</CreditsText>
        </TextFlex>
        : <></>  }
    </CreditsFlex>
  )
}
