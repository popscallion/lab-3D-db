import React, {Suspense, useEffect, useState} from 'react';
import { Text, Flex } from 'rebass/styled-components'
import styled, {ThemeProvider} from 'styled-components'
import Firebase from 'firebase'
import Viewer from './Viewer';
import theme from './theme'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}



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
    Firebase.initializeApp(firebaseConfig)
    Firebase.database()
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
