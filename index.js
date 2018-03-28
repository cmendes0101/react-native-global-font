import React from "react"
import {Text, Platform} from 'react-native'
import wrap from 'lodash.wrap'

let _applyed = false
export default class GlobalFont {
    static applyGlobal(fontFamily, multifile = false) {
        if (_applyed) { return }
        Text.prototype.render = wrap(Text.prototype.render, function (func, ...args) {
            let originText = func.apply(this, args)
            let fontOverride = {}
            
            if (multifile 
                && fontFamily 
                && fontFamily.indexOf("-") >= 0
            ) {
                if (Platform.OS === 'ios') {
                    fontFamily = fontFamily.indexOf("-")[0]
                } else if(Platform.OS === 'android') {
                    fontOverride = { fontWeight: null, fontStyle: null }
                }
            }
                        
            return React.cloneElement(originText, {
                style: [
                    {fontFamily: fontFamily},
                    originText.props.style,
                    fontOverride
                ]
            })
        })
        _applyed = true
    }
}
