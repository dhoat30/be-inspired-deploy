import React from 'react'
import styled from 'styled-components'
function SelectInput(props) {
    const options = props.options.map(item => {
        return (
            <option key={item.value} value={item.value}>{item.title}</option>
        )
    })
    return (
        <Select name={props.name}>
            {options}
        </Select>
    )
}

export default SelectInput
const Select = styled.select`
width: 100%;
display: block;
height: 45px;
border: 2px solid #ddd;
outline: none;
color: var(--darkGrey);
margin: 10px 0 0 0;
  padding: 0 5px 0 5px;
  border-radius:10px;
  background: var(--offWhite);
`
