import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {  ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";



export const MenuItem = ({icon, label,id}) => {
    return (
        
            <ListItem disablePadding key={id}>
              <ListItemButton >
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label}/>
              </ListItemButton>
            </ListItem>
    )
}

MenuItem.propTypes = {
    
    
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)
