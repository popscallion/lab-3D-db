import React, { useContext, useState, useEffect } from 'react'
import { Box, Flex } from 'rebass/styled-components'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import SpecimenPane from './views/SpecimenPane'
import InfoPane from './views/InfoPane'
import Tree from './views/Tree-svg'

export const HoverContext = React.createContext()
export const SetHoverContext = React.createContext()
export const IdContext = React.createContext()
export const SetIdContext = React.createContext()
export const NodeContext = React.createContext()
export const SetNodeContext = React.createContext()
export const LabContext = React.createContext()
export const SetLabContext = React.createContext()
export const DataContext = React.createContext()

const iconSize = '56px'

const Universe = styled(Box)`
  height: 100%;
  background-color: black;
  font-family: 'Cabin', sans-serif;
`

const Galaxy = props =>
  <Flex
    {...props}
    sx={{
      flexFlow:['column-reverse nowrap', 'row nowrap'],
      height: '100vh',
    }}
  />

const TreeBox = styled(Box)`
  z-index: 10;
  position: fixed;
  bottom: 50%;
  right: calc(65% - ${iconSize}/2);
`



export default function App(props) {
  const [lab, setLab] = useState(Object.keys(props.data.labs).sort((a, b) => a.slice(3)-b.slice(3))[0])
  const [node, setNode] = useState(Object.keys(props.data.labs[lab].nodes)[0])
  const [id, setId] = useState(props.data.nodes[node].default)
  const [hover, setHover] = useState(id)

  useEffect (() => {
    setNode(Object.keys(props.data.labs[lab].nodes)[0])
  },[lab])
  useEffect (() => {
    setId(props.data.nodes[node].default)
  },[node])

  return (
    <DataContext.Provider value={props.data}>
      <SetLabContext.Provider value={setLab}>
        <LabContext.Provider value={lab}>
          <SetNodeContext.Provider value={setNode}>
            <NodeContext.Provider value={node}>
              <SetIdContext.Provider value={setId}>
                <IdContext.Provider value={id}>
                  <Universe>
                    <TreeBox>
                      <Tree iconSize={iconSize}/>
                    </TreeBox>
                    <Galaxy>
                      <HoverContext.Provider value={hover}>
                        <SetHoverContext.Provider value={setHover}>
                          <InfoPane />
                          <SpecimenPane />
                        </SetHoverContext.Provider>
                      </HoverContext.Provider>
                    </Galaxy>
                  </Universe>
                </IdContext.Provider>
              </SetIdContext.Provider>
            </NodeContext.Provider>
          </SetNodeContext.Provider>
        </LabContext.Provider>
      </SetLabContext.Provider>
    </DataContext.Provider>
  )
}
