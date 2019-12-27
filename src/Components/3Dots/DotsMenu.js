import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export class DotsMenu extends Component {
    render() {
        return (
            <MenuProvider style={{ flexDirection: 'column', padding: 30 }}>
                <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                    <MenuTrigger text='Select option' />
                    <MenuOptions>
                        <MenuOption value={1} text='One' />
                        <MenuOption value={2}>
                            <Text style={{ color: 'red' }}>Two</Text>
                        </MenuOption>
                        <MenuOption value={3} disabled={true} text='Three' />
                    </MenuOptions>
                </Menu>
            </MenuProvider>
        )
    }
}

export default DotsMenu
