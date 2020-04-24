import React, {Suspense, useEffect, useState} from 'react';
import { Text, Flex } from 'rebass/styled-components'
import styled, {ThemeProvider} from 'styled-components'
import firebase from './firebase'
import Viewer from './Viewer';
import theme from './theme'

const Loading = props =>
    <Text
      {...props}
      sx={{
        fontFamily: 'Poppins',
        fontWeight: '900',
        fontSize: '30px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'ochre'
      }}
    />

export default function Context(){
  const [loaded, setLoaded] = useState(false)
  const [db, setDb] = useState({  labs:{},
                                  nodes:{},
                                  specimens:{},
                                  content:{}})
  useEffect(() => {
    // firebase.initializeApp(firebaseConfig)
    firebase.database()
    .ref('/')
    .once('value')
    .then((snapshot) => {
      setDb({
        labs:snapshot.val().labs,
        nodes:snapshot.val().nodes,
        specimens:snapshot.val().specimens,
        content:snapshot.val().content
      });
      return
    }).then(()=>setLoaded(true))
  }, [])
  if (loaded) {
    return (
      <ThemeProvider theme={theme}>
        <Viewer data={db}/>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Flex sx={{ flexFLow:'column nowrap',
                    justifyContent:'center',
                    alignItems:'center',
                    minHeight:'100vh'}}>
          <Loading >Loading...</Loading>
        </Flex>
      </ThemeProvider>
    )
  }
}
