import React from "react"
import {Text, Platform} from 'react-native'
import wrap from 'lodash.wrap'

let _applyed = false
export default class GlobalFont {
    static applyGlobal(fontFamily) {
        if (_applyed) { return }
        Text.prototype.render = wrap(Text.prototype.render, function (func, ...args) {
            let originText = func.apply(this, args)
            let fontOverride = { fontWeight: null, fontStyle: null }
            
            if (fontFamily.indexOf("-") >= 0) {
                if (Platform.OS === 'ios') {
                    fontFamily = fontFamily.indexOf("-")[0]
                    fontOverride = {}
                }
            }
            
            const newStyle = Object.assign(originText.props.style, fontOverride)
            
            return React.cloneElement(originText, {
                style: [
                    {fontFamily: fontFamily},
                    newStyle
                ]
            })
        })
        _applyed = true
    }
}
